# Dimotek — instrucciones para agentes/LLMs

Sitio de marketing en Next.js 16 (App Router) + React 19 + Tailwind v4 + shadcn/ui.
Es un rebranding de un template v0.app ("COMPUTE/Optimus", self-serve AI SaaS)
hacia **Dimotek**, una agencia de systems integration / AI engineering.
El tono y el copy deben hablar como agencia en primera persona ("we design,
we build, we integrate"), no como producto self-serve.

## Workflow de git (obligatorio)

- Branch de trabajo: `v0/staging-preview` — todo el trabajo se hace aquí.
- **Nunca** tocar `main` salvo que el usuario pida explícitamente "mergea a main"
  (o equivalente explícito). Cada push a una branch dispara auto-deploy en Vercel.
- Las preview URLs de Vercel son públicas a propósito (Vercel Authentication
  está deshabilitado por pedido explícito del usuario) — no es un descuido.
- Antes de cualquier merge a `main`, recordar al usuario que **Pricing** y
  **Testimonials** siguen pendientes (ver abajo).
- Commits: mensaje corto en el idioma que uses, terminar con
  `Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>` (ajustar el nombre
  del modelo si sos otro LLM).

## Estilo de trabajo esperado

- El usuario escribe en español; está bien responder en español.
- Respuestas cortas y directas, sin explicaciones largas no pedidas.
- Para cambios ambiguos o grandes (rediseños, specs formales), analizar y
  **confirmar con el usuario antes de implementar** — no asumir.
- Verificar cambios visuales/UI en navegador real (desktop y mobile), revisar
  consola/logs de servidor, antes de dar un cambio por terminado.
- Preferir verificación medible (`getBoundingClientRect`, `getComputedStyle`,
  extraer pixels de `canvas.toDataURL()`) sobre estimación visual cuando hay
  ambigüedad sobre tamaños/colores/legibilidad.
- Evitar overlays oscuros fijos tipo "scrim panel" para legibilidad de texto
  sobre fondos animados — el usuario los rechazó explícitamente; usar
  gradientes suaves en su lugar.
- No reintroducir features "self-serve SaaS" (contadores de uso en vivo,
  Developer SDK, "Sign in", "1,000 free tasks", etc.) — fueron removidas a
  propósito porque no aplican a un modelo de agencia.

## Estado de las secciones (`components/landing/`)

- **Eliminadas, no recrear**: `metrics-section.tsx` (contador de agentes en
  vivo falso), `developers-section.tsx` (Developer SDK falso),
  `features-section.tsx` (versión original de Capabilities, reemplazada).
- **Capabilities**: `features-section-accordion.tsx` es la versión vigente
  (acordeón, 5 ítems). Fila colapsada objetivo 82-90px, panel expandido
  250-280px — si se edita, volver a medir en vivo, no a ojo.
- **Hero**: fondo animado en canvas (halftone dot-grid), no video. Si hay que
  tocar la animación, calibrar wavelength proporcional al ancho del canvas
  (no valores absolutos fijos) para que desktop y mobile tengan la misma
  velocidad/escala percibida.
- **Pendientes sin resolver** (no completar sin pedirle al usuario):
  - **Pricing**: falta decisión de modelo de negocio (cotización a medida vs.
    tiers de servicio con nombre).
  - **Testimonials**: contenido actual es ficticio ("Marcus Webb / Flux
    Systems"), falta un cliente real con quote/logo.
  - **Architecture/Infrastructure section**: tiene un acento rosa (`#eca8d6`)
    animado inconsistente con el azul de marca de Dimotek — reportado, sin
    resolver, esperando decisión del usuario.

## Coordinación entre agentes

Si más de un LLM/agente trabaja en este repo en paralelo, coordinar quién
toca qué archivo (o usar branches separadas partiendo de `v0/staging-preview`
y mergear con cuidado) — no hay ningún mecanismo de lock automático.
