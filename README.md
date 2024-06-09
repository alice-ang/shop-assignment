[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/CFBPgyfR)

Inga felmeddelanden visas för besökaren om API:et inte skulle gå att nå

Generic Types saknas för API-responser
Din `get`-funktion i `lib/api.ts` är visserligen en generic function men du default:ar `T` till `any`, bättre vore att lämna den utan default-värde (då blir den `unknown` så man blir tvingad att typa responsen. Detta triggar också ett fel när man bygger appen.

Flera imports som inte används, se bifogad byggrapport
