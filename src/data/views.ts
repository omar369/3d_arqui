export interface View {
  id: string;
  label: string;
  image: string;
  target: string;
}

export const views: View[] = [
  { id: 'front', label: 'Fachada Principal', image: '/imgs/1.png', target: 'front_face' },
  { id: 'left', label: 'Vista Izquierda', image: '/imgs/2.png', target: 'left_face' },
  { id: 'right', label: 'Vista Derecha', image: '/imgs/rendr1.png', target: 'right_face' },
  { id: 'back', label: 'Vista Trasera', image: '/imgs/rendr3.png', target: 'back_face' },
  { id: 'top', label: 'Vista Superior', image: '/imgs/3.png', target: 'top_face' },
  { id: 'interior_1', label: 'Lobby Principal', image: '/imgs/6.png', target: 'interior_1' },
  { id: 'interior_2', label: 'Zona Norte', image: '/imgs/rendr4.png', target: 'interior_2' },
  { id: 'interior_3', label: 'Zona Sur', image: '/imgs/rendr5.png', target: 'interior_3' },
  { id: 'interior_4', label: 'Pasillos', image: '/imgs/rendr8.png', target: 'interior_4' },
];
