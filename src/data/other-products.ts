
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
  description?: string;
}

export const cupcakesList: Cupcake[] = [
  {
    id: 'vanilla-cupcake',
    name: 'Vanilla Cupcake',
    price: '30',
    image: '/lovable-uploads/80b7aba9-571c-4ff5-af43-14e2a96f08b0.png',
    description: 'Light and fluffy vanilla cupcake topped with creamy vanilla frosting and delicate sprinkles.'
  },
  {
    id: 'chocolate-cupcake',
    name: 'Chocolate Cupcake',
    price: '35',
    image: '/lovable-uploads/145c73a4-518d-4d8b-9b9d-299ce3ec0479.png',
    description: 'Rich chocolate cupcake topped with smooth chocolate frosting.'
  },
  {
    id: 'red-velvet-cupcake',
    name: 'Red Velvet Cupcake',
    price: '40',
    image: '/lovable-uploads/a15ec916-c054-464e-8676-4b65197bba2f.png',
    description: 'Classic red velvet cupcake with cream cheese frosting and red velvet crumbs.'
  },
  {
    id: 'brownie-cupcake',
    name: 'Brownie Cupcake',
    price: '45',
    image: '/lovable-uploads/a3c0a5a5-8880-45b3-a809-6faca281417d.png',
    description: 'Decadent chocolate brownie cupcake topped with ice cream and chocolate drizzle.'
  },
  {
    id: 'choco-lava-cupcake',
    name: 'Choco Chip Cupcake',
    price: '40',
    image: '/lovable-uploads/8823ff7f-1f87-465b-a0a3-7e6017d76578.png',
    description: 'Chocolate cupcake topped with chocolate frosting and chocolate chips.'
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
