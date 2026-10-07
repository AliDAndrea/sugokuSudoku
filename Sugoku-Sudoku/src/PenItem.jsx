import * as images from './figmages/index.js'
{/* placeholder proces */}
export const penItems = [
  {
    name: 'Multi Pen',
    fontType: 'Victor Mono',
    boldness: 'normal',
    image: images.MultiPen,
    price: 100,
    owned: false,
  },
  {
    name: 'Crayon Pen',
    fontType: 'Chivo Mono',
    boldness: 'black',
    image: images.CrayonPen,
    price: 50,
    owned: false,
  },
  {
    name: 'Brush Pen',
    fontType: 'Xanh Mono',
    boldness: 'normal',
    image: images.BrushPen,
    price: 75,
    owned: false,
  },
  {
    name: 'Cheap Pen',
    fontType: 'Piedra',
    boldness: 'normal',
    image: images.CheapPen,
    price: 25,
    owned: false,
  },
  {
    name: 'Ink Pen',
    fontType: 'Piedra',
    boldness: 'normal',
    image: images.InkPen,
    price: 125,
    owned: false,
  },
  {
    name: 'Marker Pen',
    fontType: 'Piedra',
    boldness: 'normal',
    image: images.MarkerPen,
    price: 100,
    owned: false,
  },
  {
    name: 'Mechanical Pen',
    fontType: 'Piedra',
    boldness: 'normal',
    image: images.MechPen,
    price: 150,
    owned: false,
  },
  {
    name: 'Pen Pen',
    fontType: 'Piedra',
    boldness: 'normal',
    image: images.PenPen,
    price: 50,
    owned: false,
  },
  {
    name: 'Pencil Pen',
    fontType: 'Piedra',
    boldness: 'normal',
    image: images.PencilPen,
    price: 75,
    owned: true,
  },
  {
    name: 'Quill Pen',
    fontType: 'Piedra',
    boldness: 'normal',
    image: images.QuillPen,
    price: 200,
    owned: false,
  },
  {
    name: 'Stylus Pen',
    fontType: 'Piedra',
    boldness: 'normal',
    image: images.StylusPen,
    price: 175,
    owned: false,
  },
  {
    name: 'Yatate Pen',
    fontType: 'Piedra',
    boldness: 'normal',
    image: images.YatatePen,
    price: 225,
    owned: false,
  },
]

export const mainPen = penItems.find((pen) => pen.name === 'Pencil Pen')

export default function PenItem({ item }) {
  return (
    <div>
      <img src={item.image} alt={item.name} />
      <p style={{ fontFamily: item.fontType, fontWeight: item.boldness }}>
        {item.name}
      </p>
      <p>{item.price}</p>
    </div>
  )
}
