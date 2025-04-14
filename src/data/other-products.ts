
export interface CakeJar {
  id: string;
  name: string;
  price: string;
  image: string;
  description?: string;
}

export const cakeJarsList: CakeJar[] = [
  {
    id: 'vanilla-jar',
    name: 'Vanilla Cake Jar',
    price: '60',
    image: '/lovable-uploads/80b2e418-4b8f-4bc1-a409-fa99c49e591e.png',
    description: 'Delicious layers of vanilla cake and frosting served in a convenient jar.'
  },
  {
    id: 'chocolate-jar',
    name: 'Chocolate Cake Jar',
    price: '65',
    image: '/lovable-uploads/b37abae5-41cb-4244-8d14-cfbfa686d46c.png',
    description: 'Rich chocolate cake layered with chocolate frosting in a convenient portable jar.'
  },
  {
    id: 'red-velvet-jar',
    name: 'Red Velvet Cake Jar',
    price: '70',
    image: '/lovable-uploads/23baadb0-5374-498e-89f0-bfe78200b65e.png',
    description: 'Classic red velvet cake with cream cheese frosting served in a handy jar.'
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
    image: '/lovable-uploads/f4dce3a9-9aa4-442f-baa2-ccdc8c81896f.png',
    description: 'Light and fluffy vanilla cupcake topped with creamy vanilla frosting and delicate sprinkles.'
  },
  {
    id: 'chocolate-cupcake',
    name: 'Chocolate Cupcake',
    price: '35',
    image: '/lovable-uploads/4b333cdc-9d82-4ca8-81be-1f01d9d415c1.png',
    description: 'Rich chocolate cupcake topped with smooth chocolate frosting and chocolate chips.'
  },
  {
    id: 'red-velvet-cupcake',
    name: 'Red Velvet Cupcake',
    price: '40',
    image: '/lovable-uploads/88e851af-dbdb-442c-8b91-1c71242d260d.png',
    description: 'Classic red velvet cupcake with cream cheese frosting and red velvet crumbs.'
  },
  {
    id: 'brownie-cupcake',
    name: 'Brownie Cupcake',
    price: '45',
    image: '/lovable-uploads/b2598399-7631-4419-b6e9-47cf9b84b0ef.png',
    description: 'Decadent chocolate brownie cupcake topped with ice cream and chocolate drizzle.'
  },
  {
    id: 'choco-lava-cupcake',
    name: 'Choco Chip Cupcake',
    price: '40',
    image: '/lovable-uploads/3240bb48-8c22-4d7a-8e09-62903ba01b6a.png',
    description: 'Chocolate cupcake topped with chocolate frosting and chocolate chips.'
  }
];

export interface CakePop {
  id: string;
  name: string;
  price: string;
  image: string;
  description?: string;
}

export const cakePopsList: CakePop[] = [
  {
    id: 'red-velvet-cake-pops',
    name: 'Red Velvet Cake Pops',
    price: '25',
    image: '/lovable-uploads/0a676041-3f50-4827-93ce-b9c65a80fc84.png',
    description: 'Bite-sized red velvet cake pops dipped in white chocolate with festive sprinkles.'
  },
  {
    id: 'chocolate-cake-pops',
    name: 'Chocolate Cake Pops',
    price: '25',
    image: '/lovable-uploads/0a676041-3f50-4827-93ce-b9c65a80fc84.png',
    description: 'Chocolate cake pops dipped in milk chocolate coating for a perfect bite-sized treat.'
  },
  {
    id: 'vanilla-cake-pops',
    name: 'Vanilla Cake Pops',
    price: '20',
    image: '/lovable-uploads/0a676041-3f50-4827-93ce-b9c65a80fc84.png',
    description: 'Light vanilla cake pops dipped in white chocolate with colorful sprinkles.'
  }
];
