// Contenido compartido entre el HTML y los ficheros para motores generativos.
//
// Antes llms.txt y llms-full.txt se mantenían a mano en public/ y se quedaron congelados
// una versión por detrás: seguían publicando el FAQ que ya se había retirado por
// canibalización, una comparativa sin las dos filas donde 1to1AI pierde, y "cuatro
// métodos" cuando la guía ya hablaba de cinco. Un LLM que citara el sitio reproducía
// contenido derogado justo en el canal donde este dominio sí puede competir.
//
// La corrección de raíz es esta: una sola fuente que consumen la página y las rutas
// app/llms.txt y app/llms-full.txt. Si divergen otra vez, será un fallo de compilación,
// no de disciplina.

export const HOME_FAQ = [
  {
    q: '¿Qué necesito tener antes de empezar?',
    a: 'Una cuenta publicitaria de Meta con un dataset (el antiguo Pixel) ya creado, y un número de WhatsApp Business por el que cierres ventas. Nada más: la configuración del evento y del formulario la hace 1to1AI.',
  },
  {
    q: '¿Tengo que tocar mi sitio web?',
    a: 'No. Toda la integración ocurre entre 1to1AI y la API de Conversiones de Meta, del lado del servidor. No hay que instalar scripts ni modificar plantillas, y por eso no depende de tu equipo de desarrollo.',
    to: 'alimentar-pixel-meta-desde-whatsapp',
  },
  {
    q: '¿Qué pasa con los datos de mis clientes?',
    a: 'Los identificadores de contacto que se envían a Meta —correo y teléfono— viajan cifrados con SHA-256. El hash reduce la exposición pero no anonimiza: sigue siendo dato personal, así que en México necesitas aviso de privacidad que declare la transferencia.',
    to: 'api-de-conversiones-meta-que-es',
  },
  {
    q: '¿Cuándo se empiezan a notar los resultados?',
    a: 'El evento llega a Meta en segundos, pero el conjunto de anuncios entra en fase de aprendizaje y necesita del orden de 50 conversiones semanales para estabilizarse. Entre una y dos semanas de costos erráticos son normales, y tocar presupuestos durante ese periodo reinicia el aprendizaje.',
    to: 'medir-roas-campanas-whatsapp',
  },
  {
    q: '¿Cuánto tarda la implementación?',
    a: 'La revisión de la solicitud tarda 24 a 48 horas. Tras la aprobación, la configuración del evento personalizado y del formulario inteligente se completa el mismo día.',
  },
  {
    q: '¿Por qué el acceso es por solicitud y no abierto?',
    a: 'Porque por debajo de cierto volumen la señal no alcanza para que el algoritmo de Meta aprenda: con pocas conversiones semanales el conjunto de anuncios no sale de la fase de aprendizaje y la integración no cambia nada. El umbral son 500 leads mensuales.',
  },
]

export const COMPARISON = {
  caption: 'Comparación de métodos de atribución para ventas por WhatsApp',
  columns: ['CRITERIO', '1TO1AI', 'UTMS MANUALES', '"¿CÓMO NOS CONOCISTE?"', 'NO MEDIR'],
  rows: [
    ['Precisión de atribución', 'Evento por evento, a nivel anuncio', 'Parcial; se pierde al saltar al chat', 'Baja; depende de la memoria del cliente', 'Nula'],
    ['Esfuerzo del equipo', 'Automático tras la configuración', 'Alto y constante', 'Una pregunta por cada venta', 'Ninguno'],
    ['Tiempo de implementación', '1 día tras aprobación', 'Semanas de disciplina', 'Inmediato pero impreciso', '—'],
    ['Qué aprende Meta', 'Ventas reales, con valor de conversión', 'Clics, no ventas', 'Nada — el dato nunca llega al pixel', 'Nada'],
    ['Mantenimiento y riesgo', 'Continuo: si un hash va mal normalizado, Meta acepta el evento y no lo atribuye, sin dar error', 'Alto, pero los fallos se ven', 'Ninguno', 'Ninguno'],
    ['Carga de cumplimiento', 'Alta: transfieres identificadores personales a un tercero y necesitas aviso de privacidad', 'Baja', 'Ninguna', 'Ninguna'],
  ],
  // Las dos últimas filas son las que 1to1AI pierde. Van a propósito: una comparativa
  // donde la opción propia gana todas las filas no informa de nada.
  losingRows: 2,
}

export const GLOSSARY = [
  ['ROAS', 'Retorno sobre la inversión publicitaria: ingresos generados por cada peso gastado en anuncios.'],
  ['CPL', 'Costo por lead: lo que cuesta conseguir cada contacto interesado.'],
  ['Pixel de Meta', 'Código de Meta que registra las acciones de los usuarios para medir y optimizar campañas.'],
  ['CAPI', 'API de Conversiones: canal de servidor a servidor para enviar eventos a Meta sin depender del navegador.'],
  ['ctwa_clid', 'Identificador de clic que Meta adjunta al primer mensaje de una conversación originada por un anuncio Click-to-WhatsApp.'],
  ['Atribución', 'Proceso de identificar qué anuncio o canal originó cada conversión.'],
  ['Evento de conversión', 'Señal que informa a Meta que ocurrió una acción valiosa: compra, registro o cita.'],
  ['Deduplicación', 'Mecanismo por el que Meta descarta la copia repetida de un evento que llega por Pixel y por CAPI con el mismo event_id.'],
  ['EMQ', 'Calidad de coincidencia de eventos: puntuación de 1 a 10 que indica con qué facilidad Meta consigue casar un evento con una cuenta.'],
]
