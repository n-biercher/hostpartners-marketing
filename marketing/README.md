# Marketing Export

Die Marketing-Seiten sind jetzt gebündelt unter `src/marketing/`, damit du sie direkt in ein separates Next.js-Projekt übernehmen kannst.

## Relevante Exporte

- `src/marketing/index.ts`
- `src/marketing/components.ts`
- `src/marketing/data.ts`
- `src/marketing/metadata.ts`

## Was du ins neue Projekt kopierst

- `src/components/marketing/*`
- `src/lib/marketing/*`
- `src/marketing/*`
- die genutzten Utility-Dateien wie `src/lib/utils.ts`
- eure `globals.css` Marketing-Styles und ggf. Fonts aus `src/app/layout.tsx`

## Erwartete Abhängigkeiten

- `next`
- `react`
- `framer-motion`
- `lucide-react`
- `clsx`
- `tailwind-merge`

## Routing-Hinweis

Die Seiten selbst sind marketing-portabel, aber CTA-Links zeigen aktuell standardmäßig auf `/login` und `/dashboard`.
Wenn die Produkt-App auf einer separaten Subdomain wie `dashboard.hostpartners.de` läuft, setze diese Links im neuen Projekt gezielt auf diese Ziel-URL um.
