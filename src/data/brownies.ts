
export interface Brownie {
  id: string;
  name: string;
  perPiecePrice: string;
  halfKgPrice: string;
  oneKgPrice: string;
  image: string;
  description: string;
}

export const browniesList: Brownie[] = [
  {
    id: 'nutella-brownie',
    name: 'Nutella Brownie',
    perPiecePrice: '60',
    halfKgPrice: '570',
    oneKgPrice: '1129',
    image: '/lovable-uploads/f10d9d01-5a6c-42a6-a63d-b36c0ae8ff85.png',
    description: 'Rich chocolate brownie swirled with creamy Nutella for an irresistible hazelnut chocolate flavor.'
  },
  {
    id: 'dark-chocolate-brownie',
    name: 'Dark Chocolate Brownie (Classic)',
    perPiecePrice: '50',
    halfKgPrice: '449',
    oneKgPrice: '888',
    image: '/lovable-uploads/3df4beea-c1cf-4704-8484-a6feb0953155.png',
    description: 'Our classic dark chocolate brownie with a perfect balance of fudginess and rich cocoa flavor.'
  },
  {
    id: 'double-chocolate-brownie',
    name: 'Double Chocolate Brownie',
    perPiecePrice: '55',
    halfKgPrice: '500',
    oneKgPrice: '999',
    image: '/lovable-uploads/4b333cdc-9d82-4ca8-81be-1f01d9d415c1.png',
    description: 'Twice the chocolate goodness with chocolate chips folded into our rich brownie batter.'
  },
  {
    id: 'nut-brownie',
    name: 'Nut Brownie',
    perPiecePrice: '55',
    halfKgPrice: '499',
    oneKgPrice: '995',
    image: '/lovable-uploads/227804d0-dffd-4978-8ad4-6d61114acc9c.png',
    description: 'Our classic brownie loaded with crunchy mixed nuts for added texture and flavor.'
  },
  {
    id: 'fudgy-brownie',
    name: 'Fudgy Brownie',
    perPiecePrice: '50',
    halfKgPrice: '449',
    oneKgPrice: '888',
    image: '/lovable-uploads/3df4beea-c1cf-4704-8484-a6feb0953155.png',
    description: 'Extra fudgy and moist chocolate brownie that melts in your mouth with each bite.'
  },
  {
    id: 'millets-mixed-brownie',
    name: 'Millets Mixed Brownie',
    perPiecePrice: '55',
    halfKgPrice: '499',
    oneKgPrice: '995',
    image: '/lovable-uploads/837104a1-396a-4643-a15b-e250dba95123.png',
    description: 'Healthier option made with nutritious millets blended into our delicious brownie recipe.'
  },
  {
    id: 'brownie-bites',
    name: 'Tub Brownie Bites',
    perPiecePrice: '80',
    halfKgPrice: '480',
    oneKgPrice: '960',
    image: '/lovable-uploads/0a676041-3f50-4827-93ce-b9c65a80fc84.png',
    description: 'Bite-sized brownie pieces perfect for snacking, with 8 pieces per tub.'
  },
  {
    id: 'triple-chocolate-brownie',
    name: 'Triple Chocolate Brownie',
    perPiecePrice: '60',
    halfKgPrice: '550',
    oneKgPrice: '1050',
    image: '/lovable-uploads/579ca6ef-780f-4a5d-8388-6f11fe4686f4.png',
    description: 'The ultimate chocolate experience with dark, milk, and white chocolate in one decadent brownie.'
  },
  {
    id: 'red-velvet-brownie',
    name: 'Red Velvet Brownie',
    perPiecePrice: '60',
    halfKgPrice: '620',
    oneKgPrice: '950',
    image: '/lovable-uploads/f0eadafa-e8e8-410c-af92-be7aacb374e6.png',
    description: 'Classic red velvet flavor in brownie form with a hint of cocoa and stunning red color.'
  },
  {
    id: 'oreo-brownie',
    name: 'Oreo Brownie',
    perPiecePrice: '55',
    halfKgPrice: '535',
    oneKgPrice: '998',
    image: '/lovable-uploads/5e32471e-ae35-49f6-8fbd-35adaca3ca00.png',
    description: 'Chocolate brownie packed with chunks of Oreo cookies for a cookies-and-cream delight.'
  },
  {
    id: 'wheat-brownie',
    name: 'Wheat Brownie',
    perPiecePrice: '55',
    halfKgPrice: '449',
    oneKgPrice: '888',
    image: '/lovable-uploads/6396d276-59ba-4efc-b8be-0ef08b153f5e.jpg',
    description: 'Made with whole wheat flour for a healthier twist without compromising on taste.'
  },
  {
    id: 'peanut-butter-brownie',
    name: 'Peanut Butter Brownies',
    perPiecePrice: '65',
    halfKgPrice: '575',
    oneKgPrice: '1135',
    image: '/lovable-uploads/7d4a84c1-9237-48f1-a03d-281c3f6a4865.png',
    description: 'Rich chocolate brownies with peanut butter swirls for a perfect sweet and salty combination.'
  },
  {
    id: 'fudge-walnut-brownie',
    name: 'Fudge Walnut Brownies',
    perPiecePrice: '65',
    halfKgPrice: '650',
    oneKgPrice: '899',
    image: '/lovable-uploads/d75865b2-ea8e-4cc2-8c08-42ac69d140f8.png',
    description: 'Extra fudgy brownies loaded with crunchy walnuts for texture and nutty flavor.'
  },
  {
    id: 'cream-cheese-brownie',
    name: 'Cream Cheese Brownies',
    perPiecePrice: '80',
    halfKgPrice: '699',
    oneKgPrice: '999',
    image: '/lovable-uploads/8d180348-d646-4b03-9580-6a392049d11f.png',
    description: 'Decadent chocolate brownies with creamy cheesecake swirls throughout.'
  },
  {
    id: 'blondie',
    name: 'Blondie',
    perPiecePrice: '55',
    halfKgPrice: '500',
    oneKgPrice: '999',
    image: '/lovable-uploads/b1204a28-d7cd-43e9-b349-297f35b7f9bb.png',
    description: 'The vanilla version of a brownie with a rich buttery flavor, often with white chocolate chunks.'
  },
  {
    id: 'black-rice-brownie',
    name: 'Black Rice Brownie',
    perPiecePrice: '80',
    halfKgPrice: '699',
    oneKgPrice: '1200',
    image: '/lovable-uploads/6850b88a-0cfd-4f79-987e-5bdc88e700d0.png',
    description: 'Unique brownies made with nutritious black rice for added texture and health benefits.'
  }
];
