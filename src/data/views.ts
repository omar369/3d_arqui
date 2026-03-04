export interface View {
  id: string;
  label: string;
  image: string;
  target: string;
}

export const views: View[] = [
  // Caras exteriores del Selector 3D
  { id: 'front', label: 'Frente', image: '/imgs/frente.png', target: 'front_face' },
  { id: 'front_right', label: 'Esquina Frente-Derecha', image: '/imgs/frente-derecho.png', target: 'front_right_corner' },
  { id: 'right', label: 'Derecha', image: '/imgs/derecho.png', target: 'right_face' },
  { id: 'back_right', label: 'Esquina Atrás-Derecha', image: '/imgs/derecho-atras.png', target: 'back_right_corner' },
  { id: 'back', label: 'Atrás', image: '/imgs/atras.png', target: 'back_face' },
  { id: 'back_left', label: 'Esquina Atrás-Izquierda', image: '/imgs/atras-izquierda.png', target: 'back_left_corner' },
  { id: 'left', label: 'Izquierda', image: '/imgs/izquierda.png', target: 'left_face' },
  { id: 'front_left', label: 'Esquina Frente-Izquierda', image: '/imgs/izquierda-frente.png', target: 'front_left_corner' },
  { id: 'top', label: 'Vista Superior', image: '/imgs/top2.png', target: 'top_face' },

  // Renders Interiores y Nocturnos (Botones del menú)
  { id: 'interior_1', label: 'Interior 1', image: '/imgs/int1.png', target: 'interior_1' },
  { id: 'interior_2', label: 'Interior 2', image: '/imgs/int2.png', target: 'interior_2' },
  { id: 'interior_3', label: 'Interior 3', image: '/imgs/int3.png', target: 'interior_3' },
  { id: 'interior_11', label: 'Interior 11', image: '/imgs/int11.png', target: 'interior_11' },
  { id: 'interior_12', label: 'Interior 12', image: '/imgs/int12.png', target: 'interior_12' },
  { id: 'interior_13', label: 'Interior 13', image: '/imgs/int13.png', target: 'interior_13' },
  { id: 'interior_14', label: 'Interior 14', image: '/imgs/int14.png', target: 'interior_14' },
  { id: 'interior_15', label: 'Interior 15', image: '/imgs/int15.png', target: 'interior_15' },
  { id: 'interior_noche1', label: 'Nocturno 1', image: '/imgs/noche.png', target: 'interior_noche1' },
  { id: 'interior_noche2', label: 'Nocturno 2', image: '/imgs/noche2.png', target: 'interior_noche2' },
  { id: 'interior_noche3', label: 'Nocturno 3', image: '/imgs/noche3.png', target: 'interior_noche3' }
];
