---
translationStatus: translated
translationKey: kitchen-defects-caught
title: Una tasa de defectos del 30% en un pedido de 500 unidades — detectada
  antes del envío
client: Vendedor de Amazon · Estados Unidos · Cocina y comedor
summary: Un pedido recurrente que el vendedor estaba a punto de hacer a ciegas —
  misma fábrica, sin inspección. Inspeccionamos primero, y el lote no pasó.
problem: Un pedido anterior de 500 unidades del vendedor llegó con
  aproximadamente un 30% de defectos. Estaban a punto de reordenar a la misma
  fábrica sin ningún control.
action: Realizamos una inspección completa previa al envío en la fábrica,
  contamos los defectos en todo el lote y obligamos al proveedor a rehacer el
  trabajo antes del empaque. Luego preparamos los productos según las
  especificaciones de FBA.
results:
  - v: "15"
    l: unidades defectuosas detectadas antes del envío
  - v: 18 days
    l: del proveedor a listo para FBA
  - v: 2×
    l: repedidos desde entonces
cover: /img/case-kitchen-qc.webp
date: "2026-08-02"
order: 1
lang: ko
translatedAt: "2026-09-24"
translatedFrom: f0d7e95e3f4ad077a9e8a2d5d4d8aff2
---

<!-- 提示：以下案例数字为示意稿，上线前请替换为真实订单数据。 -->

## La situación

Un vendedor de Amazon con sede en EE. UU. en Cocina y Comedor había realizado un pedido de 500 unidades a una fábrica que encontraron por su cuenta. Aproximadamente el 30% llegó defectuoso: mangos agrietados, ajustes flojos, embalajes que ya se habían abierto durante el transporte. Amazon recibió el envío, pero las devoluciones comenzaron dentro de las dos primeras semanas y la valoración del listado bajó con ellas.

Su plan para el siguiente pedido era simple: misma fábrica, mismo producto, mismo precio, reordenar. La suposición era que los defectos habían sido algo puntual.

## El problema con lo "puntual"

Una tasa de defectos del 30% rara vez es aleatoria. O el molde estaba desgastado, el material fue sustituido o la fábrica había cambiado algo en el proceso para ajustarse al precio. Las tres cosas son invisibles en una muestra que la fábrica te envía — y las tres son baratas de detectar con una inspección física en la fábrica, antes de que se empaque nada.

## Lo que hicimos

Programamos una inspección previa al envío en la fábrica una vez que el lote estuvo terminado y empaquetado, utilizando una muestra estadísticamente válida contra un AQL de 2.5 para defectos mayores.

El lote no pasó. Contando por categoría, encontramos:

- **Mayores** — mangos agrietados y ajustes flojos, por encima del límite AQL
- **Menores** — arañazos superficiales y acabado irregular, dentro de la tolerancia
- **Embalaje** — cajas internas por debajo de las especificaciones, no resistirían un contenedor

Fotografiamos cada hallazgo, dimos al proveedor una lista escrita de defectos y retuvimos el pedido. Sin empaquetar, sin pago del saldo.

El proveedor rehizo el lote con un molde corregido y reempaquetó las cajas internas. Volvimos a inspeccionar el retrabajo, luego preparamos el FBA: etiquetas FNSKU aplicadas planas y escaneadas unidad por unidad, bolsas de polietileno verificadas por la advertencia de asfixia, cajas pesadas y medidas contra el plan de envío, lista de empaque reconciliada caja por caja.

## El resultado

15 unidades defectuosas fueron detectadas y corregidas antes de que el pedido se enviara. Desde el retrabajo del proveedor hasta estar listo para FBA, el pedido tomó 18 días. Nada fue rechazado al recibirlo en Amazon, y el vendedor ha vuelto a pedir dos veces desde entonces.

## La parte que se repite

El fallo no fue la fábrica — fue hacer un pedido recurrente sin verificación. La segunda orden costó $150 en inspección y evitó un retrabajo de 500 unidades en el mar. Ese es todo el negocio.

> Los números en este caso de estudio son ilustrativos y anónimos. Se omiten los detalles del cliente y del proveedor.
