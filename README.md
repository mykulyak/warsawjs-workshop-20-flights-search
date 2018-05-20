# warsawjs-workshop-20-flights-search

> Aplikacja stworzona na potrzeby WarsawJS Workshop #20

![](http://warsawjs.com/assets/images/logo/logo-transparent-240x240.png)

---

## ✨ Demo ✨

## Krok po kroku

Projekt składa się z następujących komponentów:

    - `<App>` - komponent nadrzędny, koordynuje działanie pozostałych komponentów
    - `<SearchForm>` - formularz z danymi wyszukiwania
    - `<FlightList>` - pokazuje listę znalezionych lotów, oraz zawiera formularz do filtrowania listy lotów na podstawie ceny

Podczas warsztatów stosujemy podejście:

    - make it work (zaczynamy od statycznych wersji komponentów)
    - make it right (implemntujemy logikę działania)
    - make it beautiful (stylujemy, dopieszczamy kod itd)

Zalecane jest komitowanie zmian do repozytorium po każdym kroku.

## 1. Środowisko

0. zainstalować GitHub Desktop
0. stworzyć repozytorium `warsawjs-workshop-20-flights-search`
    - nie zaznaczamy opcji "Initialize repository with a README"
    - zaznaczamy "MIT" w polu "License"

## 2. Szkielet aplikacji

0. uruchomić `create-react-app warsawjs-workshop-20-flights-search` z katalogu, którego podkatalogiem jest folder z repozytorium
0. przejść do katalogu `cd warsawjs-workshop-20-flights-search`
0. uruchomić serwer deweloperski `npm start`
0. zweryfikować czy otwiera się strona z aplikacją
0. skomitować zmiany do repozytorium za pomocą GitHub Dekstop

## 3. plik api.js

0. tworzymy plik `api.js` w katalogu `src`
0. dodajemy funkcje `readAirportList`
    - nie przyjmuje parametrów
    - używa `window.fetch` do pobierania danych z końcówki `https://warsawjs-flights-api.herokuapp.com/airports`
    - zwraca wyniki wyszukiwania (używamy `response.json()`)
0. dodajemy funkcje `searchFlights`
    - jedynym parametrem jest hash zawierający opcje wyszukiwania - `from`, `to`, `departureDate` oraz `returnDate`
    - funkcja używa `window.fetch` do pobrania danych z końcówki API `https://warsawjs-flights-api.herokuapp.com/flights/:from/:to/:depart/:return`
    - zwraca wyniki wyszukiwania (używamy `response.json()`)
0. skomitować zmiany do repozytorium za pomocą GitHub Dekstop

## 4. komponent `<App />` - wczytywanie listy lotnisk

0. rozszerżamy komponentt `<App />` o stan
    - `isLoading` - wartość logiczna, `true` jeśli w dany moment komponent zaciąga dane z API
    - `airports` - lista lotnisk zwrócona przez `readAirportList` z `api.js`
    - `searchParams` - bieżące kryteria wyszukiwania lotów
        - domyślna wartość to `null`
        - jest słownik z kluczami `from`, `to`, `departureDate` oraz `returnDate`
    - `flights` - lista lotów dla danych kryteriów wyszukiwania zwrócona przez `searchFlights`
0. implementujemy `componentDidMount()` w której zaciągamy listę lotnisk za pomocą `readAirportList()`
    - ustawiamy atrybut stanu `isLoading: true` tuż przed wywołaniem metody, oraz `isLoading: false` po zakończeniu
    - w przypadku sukcesu również ustawiamy atrybut stanu `airports`
0. w metodzie `render()`
    - gdy `isLoading === true`, pokazujemy tekst `Loading ...`
    - gdy `isLoading === false && flights is empty` pokazujemy tekst `Search form`
    - gdy `isLoading === false && flights is not empty`, pokazujemy tekst `Flight list`
0. odświeżamy zakładkę przeglądarki z aplikacją, upewniając się że lista lotnisk jest poprawnie wczytywana
    - w zakładce Network DevTools-ów powinno być widoczne odwołanie się do API
0. skomitować zmiany do repozytorium za pomocą GitHub Dekstop

## 5. komponent `<SearchForm />`

0. tworzymy plik `SearchForm.js` w katalogu `src`
0. implementujemy metodę render tak, żeby formularz zawierał następujące elementy
    - selekt z labelką "From", opcje której są wypełniane listą
    - selekt z labelką To
    - pole do wyboru daty z labelką "Departure Date"
    - pole do wyrobu daty z labelką "Return Date"
    - przyciski "Search" oraz "Reset"
0. komponent przyjmuje następujące props-y
    - `airports` - listę lotnisk
    - `initialValues` - słownik z inicjalnymi kryteriami wyszukiwania
    - `onSubmit` - funkcja która zostanie wywołana w momencie kliknięcia w przycisk Search
    - `onReset` - funkcja która zostanie wywołana w momencie kliknięcia w przycisk Reset
0. implementujemy handler-y zmian wartości pól formularza (np. `handleFromChange(event)`). Każdy z nich powinien ustawiać odpowiedni atrybut w stanie formularza na nową wartość pola tekstowego
0. implementujemy `handleSubmit` oraz `handleReset`. Pierwsza powinna wywołać callback przekazany w props-ach jako `onSubmit` z aktualnymi wartościami, druga natomiast powinno reset-ować stan komponentu
0. modyfikujemy metodę `render()` komponentu `App` tak żeby zamiast tekstu Search form był wyświetlany formularz (nie zapomninamy o przekazywaniu odpowiednich props-ów do komponentu formularza)
0. implementujemy metodę `handleSubmitSearchForm(params)` w komponencie `App` która powinna wywołać funkcje `searchFlight` z odpowiednimi parametrami wyszukiwania
    - analogicznie jak w `componentDidMount` trzeba ustawiać `isFetching` na `true` przed rozpoczęciem strzału do API, oraz ustawiać go z powrotem na `false` po otrzymaniu zwrotki
    - dodatkowo, jeśli strzał do API zakończył się sukcesem, należy ustawić atrybuty stanu `searchParams` oraz `flights`
0. weryfiujemy działanie formularza, poprawiamy ew. błędy oraz komitujemy zmiany do repozytorium

## 6. komponent `<FlightList>`

0. tworzymy plik `FlightList.js` w katalogu `src`
0. implementujemy szkielet komponenta `<FlightList>`
    - komponent powienien przyjmować props `flights` zawierający pełną listę lotów, oraz callback `onReset` który będzie wywołany w momencie powrotu do formularza z kryteriam wyszukiwania
    - metoda `render()` powinna wyświetlić listę elementów (np `<li>`) na podstawie listy przekazanej w props-ach
0. implementujemy przycisk "Powrót" - kliknięcie na nim powinno wywołać callback onReset przekazany w props-ach przez komponent App
0. weryfikujemy poprawność działania komponentu, poprawiamy ew. błędy
0. komitujemy zmiany do repozytorium

## 7. filtrowanie wyników w komponencie `<FlightList>`

0. dodajemy do stanu komponentu atrybuty `priceFrom`, `priceTo` oraz `flights`, w których będziemy przechowywać aktualne wybrane kryteria filtrowania oraz przefiltrowaną listę lotów
0. modyfikujemy metodę `render()` żeby wyświetlała na górzę komponentu formularz filtrowania z dwoma polami numerycznymi. Wartości których powinny być brane z odpowiednich atrybutów stanu
0. implementujemy metody obsługujące zmiany wwartości oraz utratę fokusu pól formularza
    - po zmianie wartości należy zaktualizować stan komponentu
    - po utracie fokusu powinniśmy przefiltrować listę lotów przekazaną jako props i wynik umieścić w atrybucie stanu
0. zmodyfikować metodę `render()` żeby do wyświetlania listy wyników używała atrybut stanu a nie listę z props-ów
0. weryfikujemy poprawność filtrowania, poprawiamy ew. błędy
0. komitujemy zmiany do repozytorium

## 8. stylowanie komponentów

0. dodajemy pliki `.css` dla komponentów które chcemy ostylować, importujemy je z odpowiednich plików `.js`
0. dobrą praktyką podczas stylowania jest używanie tylko nazw klas. Ponieważ w tym projekcie nazwy klas są globalne, warto dodawać do nazwy klas nazwę komponentu, np. `SearchForm-field`
0. komitujemy zmiany do repozytorium
