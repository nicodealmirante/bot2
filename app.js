const { createBot, createProvider, createFlow, addKeyword, EVENTS } = require('@bot-whatsapp/bot')
const axios = require("axios");
const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const JsonFileAdapter = require('@bot-whatsapp/database/json');

var res1;
var res2;
 const getTicket = async (donde) => {

  try {
    var config = {
      method: "get",
      url: `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${donde}%20Buenos%20Aires%20Argentina&origins=Ramos%20Mejia%20Buenos%20Aires%20Argentina&key=AIzaSyD42_Z3FeSHvzrhVZacZH5n80STPJj4i3o`,
    };
var asd;
    const response = await axios(config)
    res1 = response.data["destination_addresses"][0]
    asd = response.data["rows"][0]["elements"][0]["distance"].value
   if(asd<30000)(res2="Sin Cargo")
   else if(asd<1000000)(res2=((Math.round([(asd/1000)*250]/3000))*3000))
   else (res2="Fuera del area de servicio")

  } catch (e) {
    console.log(e);
    return null;
  }}


const Cliente = addKeyword(['cliente','asesor']) 
.addAction(async (ctx, {provider}) => {
   const refProvider = await provider.getInstance();
  refProvider.sendMessage("120363164361178001@g.us", { text:  `Consulta *Cliente* \Ccontacto: +${ctx.from}.` }) // say hello to everyone on the group
  console.log ("created group with id:")
  })
.addAnswer('Un asesor se comunicara con usted a la brevedad. Gracias');
const audiono = addKeyword(EVENTS.VOICE_NOTE)
.addAnswer('Disculpe, no puedo escuchar audios. Por favor utilice solo texto.');

const flowsAlquiler = addKeyword(['alquiler', 'alquilar', 'cumple','servicios'])

     .addAnswer( ['👌Te envio la info de alquiler??' ],{capture: true})

.addAnswer(['*Espejo Magico Selfie Mirror*',

'\nDiseño elegante: Nuestro espejo mágico tiene un diseño moderno y elegante que se adapta a cualquier tipo de evento.',
'Su apariencia sofisticada agrega un toque especial al ambiente.',
'\nAccesorios y decoración: Contamos con una variedad de accesorios y elementos decorativos para personalizar aún ',
'más la experiencia. Puedes elegir entre diferentes marcos, sombreros, anteojos, pizarras con mensajes divertidos' ,
'y más. Estos elementos permiten que los invitados se diviertan y creen fotos únicas.',
'\nTamaño y portabilidad: El espejo mágico tiene dimensiones compactas que facilitan su transporte e instalación en ',
'diferentes espacios. Es lo suficientemente versátil como para adaptarse a salones de eventos, fiestas en exteriores ',
'y otros lugares.',
'\nOpciones de software: Nuestro espejo mágico viene con un software propio que ofrece una amplia gama de funciones ',
'y personalización. Puedes elegir entre diferentes plantillas de diseño, agregar efectos especiales a las fotos y configurar ',
'opciones de impresión según tus preferencias.',
'\nTiempo de alquiler: El tiempo de alquiler del espejo mágico es flexible y se adapta a las necesidades de tu evento.',
' Puedes contratarlo por horas o por el tiempo que consideres necesario para brindar una experiencia completa a tus invitados.',
'\nRecuerda que nuestros servicios incluyen el montaje, desmontaje y la asistencia de personal capacitado durante todo' ,
'el evento. Estamos comprometidos en asegurar que tus invitados disfruten al máximo de la experiencia con el espejo mágico.',
`El valor del servico de 2 horas es de $ 50.000 (base)`, 
'El valor de la Hora adicional es de $ 25.000' ])
.addAnswer('Espejo Magico Selfie Mirror',{
media: ' https://admin.espejoselfiemirror.com.ar/images/banner3.jpg'}) 
.addAnswer([
'*360 Super Slow.*',
'\nEl servicio dura 2 horas. Durante ese tiempo no existe limite de caputras.',
'Los videos son filmados y compartidos en el momento ya editados automaticamente',
'Incluye accesorios (pelucas, pistola lanza burbujas, cotillon)',
`El valor del servico de 2 horas es de $ 50.000 (base)`, 
'El valor de la Hora adicional es de $ 25.000', ])
.addAnswer('Plataforma 360 Super Slow',{
media: 'https://admin.espejoselfiemirror.com.ar/images/banner.jpg', }) 
.addAnswer([
 '🔒Los valores se congelan y la fecha se reseva solo al señar el servicio', 
 `🚚El valor de los traslados no esta incluido`,
 '🚩*Servicio solo disponible para CABA y GBA*', ])    
 .addAnswer(['👌 Para poder calcular el valor de los traslados podria decirme en que localidad se desarrollaria?'],{capture: true})

 .addAnswer('Showroom',{
    media: ' https://admin.espejoselfiemirror.com.ar/images/video.mp4'})
.addAction(async (ctx, {flowDynamic, delay, gotoFlow}) => {

         await getTicket(ctx.body)

        if (res1==undefined)(flowDynamic ('Localidad incorrecta') & gotoFlow(flowPrincipal))
          else
       ( await flowDynamic([`Los traslados para:* ${res1} * Tienen un valor de $ * ${res2}.-*// Este valor es agregado a cualquier servicio que usted elija //`]))
       
})
    .addAnswer(['Un vendedor se comunicara con usted para despejar todas sus dudas.',
    'Para ello necesitaria que me brinde su *Nombre y la fecha* del servicio'], {capture: true})
    .addAnswer('Un asesor se comunicara con usted a la brevedad. Gracias, Quedo a su disposicion.')
    .addAction(async (ctx, {provider}) => {
      
      const refProvider = await provider.getInstance();
      refProvider.sendMessage("120363164361178001@g.us", { text:  `Consulta: *Alquiler* \nNumero: +${ctx.from}. \nViaticos: $ *${res2}* '\nLocalidad: *${res1}*.\nNombre y Fecha: *${ctx.body}*` }) // say hello to everyone on the group
      console.log ("created group with id: ")
      }
      )
         


const flowVenta = addKeyword(['venta', 'vender', 'comprar', 'compra'])
.addAnswer(
'👌 Te envio la info de Venta.')
.addAnswer(['*Espejo Magico Selfie Mirror*',
'\nEl Espejo Mágico de Selfie Mirror cuenta con una cámara web de alta calidad, vidrio templado resistente, una Mini PC y un',
'televisor LED de 32 pulgadas. Estas características garantizan una experiencia de alta definición para capturar momentos',
' especiales.',
'\nSu diseño compacto y portátil, con dimensiones de 126 cm de alto x 70 cm de ancho y 20 cm de profundidad en el modelo',
' Slim, permite transportarlo fácilmente en cualquier vehículo. Esto brinda una gran versatilidad y conveniencia para eventos ',
 'y fiestas.',
'\nLa facilidad de uso es una de las ventajas clave del Espejo Mágico. Simplemente tienes que enchufarlo y presionar el ',
'botón de encendido para que empiece a funcionar. Esto agiliza la instalación y permite que los eventos comiencen rápidamente.',
'\nEs importante mencionar que el Selfie Mirror no incluye una impresora, pero está preparado para funcionar con cualquier ',
'impresora que se adapte a las necesidades del cliente. Esto brinda flexibilidad para elegir la impresora que mejor se ajuste a', 
'los requerimientos de impresión.',
'\nEn cuanto al precio, el valor del equipo es de 1500 dólares ($ 750.000 pesos)  al valor del dólar blue del día de la seña. Esto ',
'puede ser una ventaja para los clientes que deseen aprovechar las condiciones del mercado al momento de adquirir el Espejo',
 'Mágico.'])
.addAnswer(['Equipo Slim Selfie Mirror'],{
media: 'https://admin.espejoselfiemirror.com.ar/images/banner4.jpg'})
.addAnswer(['*Plataforma 360 Super Slow*',
 '\nLa plataforma incluye motor, control remoto, variador de velocidad, soporte para celular o Gopro y Aro de Led',
  'El Valor en 70 o 90 cm es de $190.000',
 'El valor en 110 cm es de $220.000'])
.addAnswer(
 '✈️*Enviamos a todo el Pais.*')
 .addAnswer(['Plataforma 360 Super Slow'], {
media: 'https://admin.espejoselfiemirror.com.ar/images/banner.jpg'})
.addAnswer('Showroom',{
media: ' https://admin.espejoselfiemirror.com.ar/images/video.mp4'})
.addAnswer(['Un vendedor se comunicara con usted para despejar todas sus dudas.',
'Para ello necesitaria que me brinde su *Nombre y Ciudad*. Seria tan amable?'], {capture: true})
.addAnswer('Nos contactaremos a la brevedad. Gracias')
.addAction(async (ctx, {provider}) => {
  const refProvider = await provider.getInstance();
  refProvider.sendMessage("120363164361178001@g.us", { text:  `Consulta: *Venta* \nNumero: +${ctx.from}. \n Localidad: *${res1}*.\nNombre y Uso: *${ctx.body}*` }) // say hello to everyone on the group
  console.log ("created group with id: ")
  }) 


  
const flowPrincipal =addKeyword(EVENTS.WELCOME)
    .addAnswer([' 🙌 Hola, Como estas? Te agradezco por comunicarte con *Selfie Mirror*','Si su consulta es por informacion de nuestros servicios solo escriba la palabra: *Alquiler* o *Venta* y obtendra la informacion inmediatamente.','Si usted es cliente escriba la palabra *Cliente*'],{  capture: true},
async (ctx, {fallBack}) => 
{switch (ctx.body) {
case 'Alquiler':
 flowsAlquiler
  break;
  case 'alquiler':
    flowsAlquiler
              break;
        case 'venta':
             flowVenta
              break;
case 'Venta':
  flowVenta
  break;
  case 'Cliente':
  Cliente
    break;
    case 'cliente':
        Cliente
    break;
default:
return fallBack({body: 'No estoy configurado para entender eso. Por favor solo escriba la palabra. *Alquiler*, *Venta* o *Cliente*'})
}},

[flowVenta, flowsAlquiler,Cliente])

const main = async () => {
    const adapterDB = new JsonFileAdapter()
    const adapterFlow = createFlow([flowPrincipal,flowVenta,flowsAlquiler,Cliente, audiono])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
    