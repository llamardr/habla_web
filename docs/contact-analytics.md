# Funnel de contacto de Habla (GA4)

Propiedad configurada en el código: `G-BXN3RRLT1J`.

| Paso | Evento | Cuándo ocurre |
| --- | --- | --- |
| Visita | `page_view` | Lo envía la etiqueta de Google existente. |
| Abrir CONTACTO | `contact_open` | Al abrir las opciones; cerrar no envía este evento. |
| Elegir canal | `contact_click` | Al elegir WhatsApp o agendar una llamada. |

Parámetros de los eventos de contacto:

- `contact_placement`: `navbar_desktop`, `navbar_mobile`, `us_section`, `business_decisions` o `footer`.
- `method` (solo selección): `whatsapp` o `schedule_call`.
- `link_url` (solo selección): destino del enlace.
- `page_path` y `page_location`: página desde la que se interactúa.

El contacto del footer lleva directamente a WhatsApp: envía `contact_click`, pero no `contact_open`. Analizarlo aparte con un funnel visita → clic, para no interpretarlo como abandono del menú.

Los eventos `generate_lead` y Meta existentes se conservan por compatibilidad. No sumar `generate_lead` y `contact_click`: describen el mismo clic. Para este funnel usar únicamente `contact_click` como paso final. El clic no confirma un mensaje enviado ni una reserva; confirmar esas acciones requiere una integración adicional con el canal de destino.

## Configuración en Google Analytics

Después de publicar estos cambios:

1. Verificar en Tag Assistant / DebugView que llegan los eventos a la propiedad correcta. Probar apertura, cierre, reapertura y cada canal, en escritorio y móvil. Cada apertura debe producir un `contact_open`; cada elección, un `contact_click` con canal y ubicación correctos.
2. Crear dimensiones personalizadas de alcance Evento para `contact_placement` y `method`. Pueden tardar 24–48 horas en estar disponibles en informes.
3. En Explorar → Exploración de embudos, crear un embudo cerrado: `page_view` → `contact_open` → `contact_click`. Usar pasos seguidos indirectamente, para permitir otros eventos entre ellos.
4. Desglosar por categoría de dispositivo; comparar canales filtrando `method` en el último paso. Usar usuarios para las tasas del funnel; el recuento de eventos también incluye reaperturas o clics repetidos.
5. Si se quiere optimizar por intención de contacto, marcar `contact_click` como evento clave. Revisar si ya se cuenta `generate_lead` para evitar interpretar ambos como contactos distintos.

La visita inicial usa el `page_view` existente. Para analizar también navegación interna, comprobar en la propiedad que la medición mejorada detecta cambios de historial, antes de agregar pageviews manuales que podrían duplicarla.

Estos cambios no recuperan clics históricos ni configuran automáticamente la propiedad GA4. La compilación local no confirma la recepción en Google Analytics.

Referencias oficiales:
- https://support.google.com/analytics/answer/9327974
- https://support.google.com/analytics/answer/14240153
- https://developers.google.com/tag-platform/tag-manager/datalayer
