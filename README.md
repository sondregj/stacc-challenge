# Stacc kodeoppgave

Løsningen består av en frontend og en kalkuleringsfunksjon.

## Kjøring av koden

Kjøring krever Node.js og NPM. Etter å ha klonet repoet kjører du følgende inne i prosjektmappen;

`npm install` - Installerer avhengigheter

`npm start` - Åpner applikasjonen i nettleseren

## Frontend

Webapplikasjonen er laget med React og TypeScript. Applikasjonen består av to hovedseksjoner, en for parametervalg og en for visning av resultatet.

Man kan velge mellom å bruke API-endepunktet til Stacc eller en intern kalkuleringsfunksjon for beregningene (dette er mest for demonstrasjon).

Grafen er bygget opp av mange `<div>`-elementer, noe jeg ikke ville gjort vanligvis, men prøvde ut her. 😎

## Kalkuleringsfunksjon

Det er tre funksjoner, en for serielån og en for annuitetslån, samt en som tilpasser datastrukturen til slik den er på Stacc sitt API. Disse er ikke helt nøyaktige og det er et par småfeil.
