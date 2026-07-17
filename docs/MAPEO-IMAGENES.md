# Mapeo del banco de imágenes → web

> Fuente: carpeta `~/Downloads/Imagenes` (38 PNG "Gemini_Generated_Image_*" hi-res ≈2800px + `Print.jpg`).
> Son las imágenes originales del catálogo corporativo. Identificadas 1:1. Ref corta = primer token del hash.
> Pendiente en Fase C: recortar/optimizar (hoy pesan 5–12 MB c/u) y renombrar a `public/`.

## Hallazgo clave
El banco es **mayormente escenas de ambiente por sector** (varios productos en contexto), no fotos de producto aislado. Solo hay **3 tomas de producto individual sobre fondo liso** (`2u4asd` asa troquel, `9clyua` t-shirt, `fd8iff` asa parche). Para la grilla de tarjetas por producto (decisión del cliente), la mayoría de productos deberá **recortarse de su escena** o mantener su PNG actual; las escenas completas quedan ideales como **banner de cada sector**.

## Procesos (4/4 ✅) — Home + Nosotros
| Proceso | Archivo | Web propuesto |
|---|---|---|
| Extrusión blown film | `6e4d11` | `proceso-extrusion.jpg` |
| Impresión flexografía | `3es4j5` | `proceso-impresion.jpg` |
| Corte y rebobinado | `51lmtm` | `proceso-corte.jpg` |
| Sellado y acabado final | `udb7xt` | `proceso-sellado.jpg` |

## Gráficos de marca
| Uso | Archivo | Nota |
|---|---|---|
| 6 iconos de valores (foco, reciclaje, planeta, bolsa, rollo, empaque) | `y24npg (1)` [dup `(2)`] | Raster con los 6 juntos → mejor **extraer vector del PDF (p2/p20) o recrear SVG** en BaseIcon |
| Logos de certificación (reciclaje, d2w, OK compost/TÜV, RCS blended/100, RecyClass) | `3pa7dd` | Set sobre transparente; sirve como badges |
| Logo d2p® | `Print.jpg` | Marca ajena (azul); complementa el set de certs |

## Spreads de marca — Home hero / Nosotros / secciones
`15r9fn`, `rkv667` (familia de productos sobre mármol), `xu4oc2` (cocina, 9 productos), `82lklq` (muestrario versátil, baja calidad de match).

## Escenas por sector — banner de cada sector
| Sector | Escena principal | Escenas de apoyo |
|---|---|---|
| Alimentos y bebidas | `91j99n` (bebidas/etiquetas) | `xu4oc2` (frescos cocina), `g8f4yk` (congelados), `ns0b3m` (snacks), `neuhcq` (frutas/uvas) |
| Pesca y agroindustria | `fiigqn` (planta de mariscos) | `lo7xkv` (mulch), `syofee` (almácigo), `jaj198` (sacos), `5blqlv` (geomembrana), `5v381l` (microperforada) |
| Textil | `mel8sh` (tienda de ropa) | `h9s6uk` (almacén textil, rollos) |
| Envíos seguros y valores | `u6an7i` (mailers courier) | `jpvbpv` (dinero y valores) |
| Limpieza y cuidado personal | `xmecpl` (baño/higiene) | `he4i4d` (bolsas de residuos) |
| Retail y marketing | `p0ttvi` (bolsas retail mall) | `hp3d6h` (polipasacalles) |
| Industria en general | `1dxsng` (almacén paletizado) | `ufmpid` (bobinas film), `82lklq` (muestrario) |

## Plan por producto (grilla de tarjetas)
Leyenda: **[shot]** toma aislada lista · **[crop]** recortar de escena · **[keep]** mantener PNG actual · **[swap]** intercambiar imágenes.

### Alimentos y bebidas
Etiquetas [keep] · Fundas termoencogible botella [crop `91j99n`] · Termoencogible sixpack [crop `91j99n`] · Doypack [keep] · Doypack con válvula [keep] · Sello U [crop `g8f4yk`] · **Sello T** [crop food scene] · Twist [crop `ns0b3m`] · **Easy Peel** pote c/ tapa [crop `ns0b3m`] · **Flowpack**→bobina [crop `ufmpid`] · Shrink bag / vacío [crop `g8f4yk`] · Stand-up pouch uvas [crop `neuhcq`]

### Pesca y agroindustria
Resmas [crop `fiigqn`] · Funda congelados [crop `fiigqn`/`g8f4yk`] · Funda microperforada [crop `5v381l`] · Saco [crop `jaj198`] · Mulch y cobertores [crop `lo7xkv`] · Almácigo [crop `syofee`] · Geomembrana [crop `5blqlv`]

### Textil
Polybag [crop `mel8sh`] · Láminas y mangas [crop `h9s6uk`]

### Envíos seguros y valores
E-commerce y Courier [crop `u6an7i`] · Dinero y valores [crop `jpvbpv`]

### Limpieza y cuidado personal
Bolsa para residuos [crop `he4i4d`] · Limpieza [crop `xmecpl`] · Cuidado personal [crop `xmecpl`]

### Retail y marketing
T-shirt [shot `9clyua`] · **Asa parche** [shot `fd8iff`] · **Asa brida** [swap] · **Asa troquel** [shot `2u4asd` / `5hexj5`] · **Polipasacalles** [crop `hp3d6h`]

### Industria en general
**Bobinas film** [crop `ufmpid`] · Bolsa sello lateral [keep] · Bolsa sello fondo [keep / `5hexj5`] · **Sobre empaque** [crop `1dxsng`] · **Minería** [crop `m4de2z`] · Alimento mascotas [crop `2u807q`] · **Construcción** [crop `6de26i`]

## Notas
- `y24npg (1)` y `(2)` son idénticos (duplicado).
- Casi todos los productos que el cliente marcó "cambiar imagen/nueva" tienen fuente en el banco (Minería, Construcción, Alimento mascotas, Bobinas, Sobre empaque, Asa parche, Polipasacalles). Sin fuente dedicada: Sello T (recorte incierto).
- Referencia hash→archivo completo: los nombres reales son `Gemini_Generated_Image_<hash><hash><hash> (n).png` en la carpeta origen.
