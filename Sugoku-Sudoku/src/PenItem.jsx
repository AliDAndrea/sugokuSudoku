import * as images from './figmages/index.js'
{/* placeholder proces */}
export const penItems = [
  {
    name: 'Multi Pen',
    fontType: 'Piedra',
    boldness: 'bold',
    image: images.MultiPen,
    price: 100,
  },
  {
    name: 'Crayon Pen',
    fontType: 'Piedra',
    boldness: 'normal',
    image: images.CrayonPen,
    price: 50,
  },
  {
    name: 'Brush Pen',
    fontType: 'Piedra',
    boldness: 'normal',
    image: images.BrushPen,
    price: 75,
  },
  {
    name: 'Cheap Pen',
    fontType: 'Piedra',
    boldness: 'normal',
    image: images.CheapPen,
    price: 25,
  },
  {
    name: 'Ink Pen',
    fontType: 'Piedra',
    boldness: 'normal',
    image: images.InkPen,
    price: 125,
  },
  {
    name: 'Marker Pen',
    fontType: 'Piedra',
    boldness: 'normal',
    image: images.MarkerPen,
    price: 100,
  },
  {
    name: 'Mechanical Pen',
    fontType: 'Piedra',
    boldness: 'normal',
    image: images.MechPen,
    price: 150,
  },
  {
    name: 'Pen Pen',
    fontType: 'Piedra',
    boldness: 'normal',
    image: images.PenPen,
    price: 50,
  },
  {
    name: 'Pencil Pen',
    fontType: 'Piedra',
    boldness: 'normal',
    image: images.PencilPen,
    price: 75,
  },
  {
    name: 'Quill Pen',
    fontType: 'Piedra',
    boldness: 'normal',
    image: images.QuillPen,
    price: 200,
  },
  {
    name: 'Stylus Pen',
    fontType: 'Piedra',
    boldness: 'normal',
    image: images.StylusPen,
    price: 175,
  },
  {
    name: 'Yatate Pen',
    fontType: 'Piedra',
    boldness: 'normal',
    image: images.YatatePen,
    price: 225,
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
