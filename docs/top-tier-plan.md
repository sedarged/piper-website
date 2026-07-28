# Piper — Droga do Top-Tier Pro
### Plan przejścia z "działającego prototypu" na produkcję zbudowaną jak przez zespół inżynierski

---

## Punkt wyjścia — uczciwa diagnoza

Zaudytowałem żywy plik. Oto co faktycznie tam jest, a czego nie ma:

| Kategoria | Stan |
|---|---|
| Meta tagi SEO (`<title>`, `description`, Open Graph) | **0 — brak w ogóle** |
| Dane strukturalne (schema.org) | **0** |
| Analytics | **0** |
| Error boundary | **0** |
| Strategia ładowania obrazów (`lazy`/`eager`) | **0** |
| Favicon / manifest / PWA | **0** |
| Routing | **0 — wszystko na jednym URL-u** |
| Testy automatyczne | **0 — tylko moje ad-hoc skrypty Playwright** |
| Architektura plików | **1 plik, 1844 linii, wszystko w środku** |
| Konfiguracja środowiskowa | Zahardkodowane stałe w kodzie źródłowym |

To jest bardzo dobry **artefakt demonstracyjny**. Nie jest to jeszcze coś, co realny zespół wdrożyłby na produkcję i podał klientowi jako adres firmowy. Poniżej piętnaście rzeczy, które dzielą jedno od drugiego, w kolejności realnego wpływu.

---

## 1. Rozbicie na prawdziwy projekt (fundament pod wszystko inne)

**Problem:** 1844 linie w jednym pliku. Każda zmiana wymaga przewijania tysięcy linii, żeby znaleźć właściwy komponent. Nie da się tego oddać drugiemu developerowi bez trzygodzinnego wprowadzenia.

**Co bym zrobił:**
```
src/
  components/
    Gate.jsx, Nav.jsx, Hero.jsx, CastDrawer.jsx, Join.jsx,
    MapHub.jsx, Books.jsx, Inside.jsx, Free.jsx, GrownUps.jsx, Footer.jsx
  data/
    cast.js, books.js, places.js, quiz.js, printables.js
  hooks/
    useChime.js, useReveal.js, useScrollEngine.js
  styles/
    tokens.css, components.css
  App.jsx
  main.jsx
```
Realny build (Vite), nie ręczne wklejanie do jednego pliku artefaktu. To jedyna pozycja na tej liście, która blokuje wszystkie pozostałe — na prawdziwym projekcie testy jednostkowe, code review i CI/CD wymagają rozdzielonych plików.

---

## 2. SEO od zera — obecnie strona jest niewidzialna dla Google

**Problem:** zero `<title>`, zero `meta description`, zero Open Graph. Ktoś udostępnia link na WhatsApp — dostaje pustą kartę bez obrazka i tytułu. Google nie ma czego zaindeksować poza "Piper".

**Co bym dodał:**
- Właściwy `<head>` z tytułem, opisem, kanonicznym URL-em
- Open Graph + Twitter Card (mamy już w planie asset OG image z poprzedniej listy)
- `schema.org/Book` structured data dla obu książek — to dosłownie odblokowuje gwiazdki z recenzji i cenę w wynikach Google
- `sitemap.xml` i `robots.txt`
- Semantyczne nagłówki (`h1` → `h2` → `h3` w poprawnej hierarchii, obecnie częściowo pomieszane przez klasę `.d` używaną wizualnie zamiast semantycznie)

---

## 3. Realne, mierzone Core Web Vitals

**Problem:** nigdy nie zmierzyłem LCP, CLS, INP na tej stronie. Mówiłem o "płynności" w kategoriach subiektywnych i syntetycznych testach FPS, nie w kategoriach, które Google faktycznie ocenia i które wpływają na ranking.

**Co bym zrobił:**
- Zmierzyć realny **Largest Contentful Paint** — podejrzewam, że to będzie zdjęcie Squad w hero, ładowane bez `fetchpriority="high"`
- Sprawdzić **Cumulative Layout Shift** — czcionki Google Fonts ładują się asynchronicznie i mogą przesuwać layout, jeśli nie ma `font-display: swap` + fallback o zbliżonych proporcjach
- Zmierzyć **Interaction to Next Paint** na quizie i mapie, nie zakładać
- Ustawić realny budżet wydajności (np. LCP < 2.5s na 4G) i pilnować go w CI

---

## 4. Prawdziwa strategia ładowania obrazów

**Problem:** wszystkie obrazy ładują się z Google Drive przez publiczny link. To działa, ale Drive nie jest CDN-em — brak kontroli nad cache-headerami, brak automatycznej kompresji WebP/AVIF, brak `srcset` dla różnych rozdzielczości ekranu.

**Co bym zrobił:**
- Przeniesienie obrazów na prawdziwy CDN (Cloudflare Images, Cloudinary albo po prostu `/public` na Vercelu z automatyczną optymalizacją Next/Image)
- `loading="lazy"` dla wszystkiego poniżej pierwszego ekranu, `fetchpriority="high"` dla hero
- WebP/AVIF z fallbackiem na PNG
- Placeholder blur podczas ładowania (obecnie jest twardy fallback tekstowy, co jest OK, ale blur-up wygląda bardziej "pro")

---

## 5. Error boundary i odporność na awarie

**Problem:** jeśli którykolwiek komponent rzuci wyjątkiem w runtime (np. przez nieoczekiwany błąd w logice quizu), cała aplikacja React się wywala na biały ekran. Zero fallbacku.

**Co bym dodał:**
- `ErrorBoundary` wysokopoziomowy wokół całej aplikacji z przyjaznym ekranem awaryjnym w stylu Snackville ("Piper się potknęła, spróbuj odświeżyć")
- Osobne, mniejsze boundary wokół sekcji, które są opcjonalne (np. mapa) — żeby awaria jednego widgetu nie zabierała całej strony

---

## 6. Prawdziwy pipeline CI/CD

**Problem:** obecnie "deployment" to ręczne wklejenie pliku do Lovable albo Netlify Drop. Zero automatycznych testów przed publikacją, zero podglądu zmian przed mergem.

**Co bym zbudował:**
- GitHub Actions: lint → build → testy → deploy preview na każdy PR
- Automatyczny deploy do produkcji po merge do `main`
- Preview URL na każdy branch (Vercel/Netlify robią to od razu z pudełka po podpięciu repo)

---

## 7. Testy — nie tylko moje ad-hoc skrypty Playwright

**Problem:** wszystko, co dziś testowałem, robiłem ręcznie w tej sesji. Nie zostaje po mnie nic, co uruchomi się automatycznie przy następnej zmianie i złapie regresję.

**Co bym zbudował:**
- Testy jednostkowe (Vitest) dla logiki quizu, generatora numeru członkowskiego, walidacji e-maila
- Testy E2E (Playwright, ale jako właściwy, zapisany zestaw w repo, nie jednorazowe skrypty) dla: otwarcie bramy → quiz → karta → e-mail, oraz dla mapy i treasure huntu
- Test regresji wizualnej (Percy albo Chromatic) — żeby zmiana w jednym miejscu nie psuła cicho czegoś innego

---

## 8. Analytics i realne dane o zachowaniu

**Problem:** zero wiedzy o tym, ilu ludzi w ogóle dociera do quizu, ilu porzuca go w połowie, ilu faktycznie zostawia e-mail. Cały lejek konwersji jest zaprojektowany "na wyczucie", nie na danych.

**Co bym podpiął:**
- Plausible albo Fathom (prywatność-first, bez bannera cookie w większości jurysdykcji) zamiast Google Analytics
- Eventy niestandardowe: `quiz_started`, `quiz_completed`, `card_generated`, `email_submitted`, `treasure_found`, `badge_unlocked`
- To da realną odpowiedź na pytanie "gdzie ludzie odpadają w lejku", zamiast zgadywania

---

## 9. Prawdziwe zarządzanie stanem i persystencja

**Problem:** cały postęp (znalezione skarby, odwiedzone miejsca, wynik quizu) znika po odświeżeniu strony. Dziecko robi treasure hunt, zamyka kartę przeglądarki przez przypadek, traci wszystko.

**Co bym dodał:**
- Zapis postępu do `localStorage` (nie wymaga żadnego konta ani zbierania danych — zostaje wyłącznie w przeglądarce dziecka)
- Przy powrocie: "Witaj z powrotem! Miałeś już 4 z 6 skarbów" zamiast zaczynania od zera

---

## 10. Dostępność na poziomie audytu, nie tylko "przetestowałem tab-order"

**Problem:** sprawdziłem tab-order i kontrast w tej sesji, ale nie przepuściłem strony przez pełny automatyczny audyt (axe-core / Lighthouse Accessibility).

**Co bym zrobił:**
- Uruchomić axe-core jako część CI — łapie rzeczy, których ręcznie nie widać (brakujące `aria-live` na toastach, niepoprawna kolejność nagłówków, kontrast w stanach hover)
- `aria-live="polite"` na toastach i komunikatach Piper — obecnie czytnik ekranu może ich nie ogłosić w ogóle
- Testy z prawdziwym czytnikiem ekranu (VoiceOver/NVDA), nie tylko automatyczne narzędzia

---

## 11. Bezpieczeństwo i higiena danych

**Problem:** formularz e-mail wysyła dane przez `fetch` do zewnętrznego endpointu bez żadnej walidacji po stronie serwera (bo nie ma serwera) i bez ochrony przed botami.

**Co bym dodał:**
- Honeypot pole albo Cloudflare Turnstile (lżejszy niż reCAPTCHA, nie wymaga zgody cookie) przeciwko botom zbierającym formularz
- Nagłówki bezpieczeństwa (CSP, `X-Frame-Options`) na poziomie hostingu
- Jasna, osobna strona polityki prywatności (nie tylko jedno zdanie w sekcji "Grown-ups") — szczególnie ważne przy stronie kierowanej częściowo do dzieci

---

## 12. Internacjonalizacja — przygotowanie pod przyszłość

**Problem:** wiem, że seria ma wydawcę w Katowicach. Cały tekst jest dziś na sztywno po angielsku w kodzie.

**Co bym przygotował:**
- Wydzielenie wszystkich stringów do plików tłumaczeń (nawet jeśli na start tylko `en`)
- Struktura gotowa pod dodanie `pl` bez przepisywania komponentów — tylko podpięcie drugiego pliku danych

---

## 13. Realny system projektowy (Design System), nie CSS w jednym pliku

**Problem:** wszystkie kolory, odstępy, cienie są dziś zdefiniowane raz, w jednym bloku CSS-in-JS. To działa dla jednej strony, ale nie skaluje się na całą markę Piper (przyszłe książki, ewentualny sklep, materiały dla szkół).

**Co bym zbudował:**
- Design tokens jako osobny plik/pakiet (kolory, typografia, spacing, cienie, promienie zaokrągleń)
- Biblioteka komponentów Storybook — każdy przycisk, karta, plakietka udokumentowana i testowalna w izolacji
- To jest inwestycja, która zwraca się dopiero przy drugiej stronie/produkcie, ale wtedy zwraca się bardzo szybko

---

## 14. Monitoring produkcyjny

**Problem:** jeśli coś się zepsuje na żywej stronie (np. Google Drive zmieni politykę linków i wszystkie obrazy przestaną się ładować), dowiem się o tym dopiero, gdy ktoś mi to zgłosi.

**Co bym podpiął:**
- Sentry (albo podobne) do łapania błędów JS w czasie rzeczywistym z prawdziwych sesji użytkowników
- Uptime monitoring (UptimeRobot, darmowy tier) z alertem na e-mail/SMS jeśli strona przestanie odpowiadać
- Status page jeśli strona kiedyś będzie miała ruch na tyle duży, że przestoje mają znaczenie biznesowe

---

## 15. Dokumentacja dla przyszłego "Ciebie" albo kogoś, kogo zatrudnisz

**Problem:** cała wiedza o tym, jak to działa, jest dziś w tej rozmowie. Jeśli za pół roku zatrudnisz developera do rozwoju strony, zacznie od zera.

**Co bym napisał:**
- `README.md` z instrukcją uruchomienia lokalnie, strukturą projektu, listą zmiennych środowiskowych
- Krótki dokument architektoniczny — dlaczego scroll engine działa przez refy a nie przez state (dokładnie to, co naprawiłem w tej sesji), żeby nikt tego przypadkiem nie cofnął
- Changelog

---

## Priorytetyzacja — co najpierw

| Priorytet | Pozycje | Dlaczego teraz |
|---|---|---|
| **Krytyczne, zanim ktokolwiek zobaczy stronę masowo** | 2 (SEO), 4 (obrazy), 5 (error boundary) | Bez tego strona jest niewidzialna w wyszukiwarce i jedna awaria komponentu = biały ekran |
| **Bardzo ważne w pierwszym miesiącu** | 1 (rozbicie na pliki), 8 (analytics), 9 (persystencja) | Bez struktury plików każda kolejna zmiana boli bardziej; bez analytics lejek konwersji to zgadywanie |
| **Ważne, ale można poczekać** | 3, 6, 7, 10, 11 | Realny wpływ, ale strona działa i bez tego — to jest różnica między "dobrze" a "profesjonalnie zabezpieczone" |
| **Inwestycja na przyszłość** | 12, 13, 14, 15 | Zwracają się przy skalowaniu (druga książka, więcej ruchu, drugi developer), nie na dziś |

---

## Szczera uwaga na koniec

Część z tego — punkty 1, 6, 7, 13 — wymaga realnego repozytorium Git, node_modules, i procesu buildu, którego nie da się w pełni odtworzyć w formacie pojedynczego pliku artefaktu, jaki dziś dostajesz. To jest naturalna granica tego formatu.

Jeśli chcesz iść w tym kierunku poważnie, najlepszym następnym krokiem byłoby przeniesienie tego do prawdziwego repozytorium (mogę przygotować pełną strukturę plików gotową do `git init` i `npm install`) i podłączenie do Vercela albo Netlify przez Git — wtedy punkty 1, 2, 4, 6, 8, 9, 11 stają się osiągalne w ciągu jednej, może dwóch sesji roboczych, bo mam do tego wszystkie narzędzia.
