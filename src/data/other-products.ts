
export interface CakeJar {
  id: string;
  name: string;
  price: string;
  image: string;
}

export const cakeJarsList: CakeJar[] = [
  {
    id: 'vanilla-jar',
    name: 'Vanilla Cake Jar',
    price: '60',
    image: '/lovable-uploads/80b2e418-4b8f-4bc1-a409-fa99c49e591e.png'
  },
  {
    id: 'chocolate-jar',
    name: 'Chocolate Cake Jar',
    price: '65',
    image: '/lovable-uploads/b37abae5-41cb-4244-8d14-cfbfa686d46c.png'
  },
  {
    id: 'red-velvet-jar',
    name: 'Red Velvet Cake Jar',
    price: '70',
    image: '/lovable-uploads/23baadb0-5374-498e-89f0-bfe78200b65e.png'
  }
];

export interface Cupcake {
  id: string;
  name: string;
  price: string;
  image: string;
}

export const cupcakesList: Cupcake[] = [
  {
    id: 'vanilla-cupcake',
    name: 'Vanilla Cupcake',
    price: '30',
    image: '/lovable-uploads/5e32471e-ae35-49f6-8fbd-35adaca3ca00.png'
  },
  {
    id: 'chocolate-cupcake',
    name: 'Chocolate Cupcake',
    price: '35',
    image: '/lovable-uploads/5e32471e-ae35-49f6-8fbd-35adaca3ca00.png'
  },
  {
    id: 'red-velvet-cupcake',
    name: 'Red Velvet Cupcake',
    price: '40',
    image: '/lovable-uploads/5e32471e-ae35-49f6-8fbd-35adaca3ca00.png'
  },
  {
    id: 'brownie-cupcake',
    name: 'Brownie Cupcake',
    price: '45',
    image: '/lovable-uploads/5e32471e-ae35-49f6-8fbd-35adaca3ca00.png'
  },
  {
    id: 'choco-lava-cupcake',
    name: 'Choco Lava Cupcake',
    price: '40',
    image: '/lovable-uploads/5e32471e-ae35-49f6-8fbd-35adaca3ca00.png'
  }
];

export interface CakePop {
  id: string;
  name: string;
  price: string;
  image: string;
}

export const cakePopsList: CakePop[] = [
  {
    id: 'red-velvet-cake-pops',
    name: 'Red Velvet Cake Pops',
    price: '25',
    image: '/lovable-uploads/0a676041-3f50-4827-93ce-b9c65a80fc84.png'
  },
  {
    id: 'chocolate-cake-pops',
    name: 'Chocolate Cake Pops',
    price: '25',
    image: '/lovable-uploads/0a676041-3f50-4827-93ce-b9c65a80fc84.png'
  },
  {
    id: 'vanilla-cake-pops',
    name: 'Vanilla Cake Pops',
    price: '20',
    image: '/lovable-uploads/0a676041-3f50-4827-93ce-b9c65a80fc84.png'
  }
];
