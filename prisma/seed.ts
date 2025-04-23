import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.cartProduct.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.product.deleteMany();
  await prisma.subCategory.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany(); // если хочешь чистить и пользователей

  console.log('🧹 База очищена');

  // 1. Категории
  const coffeeCategory = await prisma.category.create({
    data: { name: 'Кофе' },
  });

  const dessertCategory = await prisma.category.create({
    data: { name: 'Десерты' },
  });

  const teaCategory = await prisma.category.create({
    data: { name: 'Чай' },
  });

  // 2. Подкатегории
  const coffeeDrinks = await prisma.subCategory.create({
    data: {
      name: 'Кофейные напитки',
      img: 'https://static.tildacdn.com/tild6337-6564-4135-a666-313764383639/photo.jpg',
      category: { connect: { id: coffeeCategory.id } },
    },
  });

  const coldDrinks = await prisma.subCategory.create({
    data: {
      name: 'Холодные напитки',
      img: 'https://static.insales-cdn.com/files/1/3498/12463530/original/s1200.jpg',
      category: { connect: { id: coffeeCategory.id } },
    },
  });

  const cakes = await prisma.subCategory.create({
    data: {
      name: 'Торты и пирожные',
      img: 'https://www.krassever.ru/statics/images/arcticles/052020/06052020x5c32fc77.jpg',
      category: { connect: { id: dessertCategory.id } },
    },
  });

  const teaDrinks = await prisma.subCategory.create({
    data: {
      name: 'Чайные напитки',
      img: 'https://avatars.dzeninfra.ru/get-zen_doc/3755324/pub_5f76b8c085c72a7ce425d100_5f76b8c185c72a7ce425d22a/scale_1200',
      category: { connect: { id: teaCategory.id } },
    },
  });

  // 3. Продукты

  const products = [
    // Кофе
    {
      name: 'Эспрессо',
      description: 'Маленький, крепкий кофе.',
      img: 'https://galaktika29.ru/upload/iblock/db6/k0ta8ki954k0l5qrh3rt4214nfa40rep.jpg',
      price: 150,
      category: coffeeDrinks,
    },
    {
      name: 'Капучино',
      description: 'С молочной пенкой.',
      img: 'https://i-coffee.me/wp-content/uploads/2022/02/Coffee_Cappuccino_Cream_Cup_Saucer_525045_2048x1152.jpg',
      price: 200,
      category: coffeeDrinks,
    },
    {
      name: 'Латте',
      description: 'Нежный и молочный.',
      img: 'https://www.torrefacto.ru/upload/uf/d00/mdoibknztzibkoforsrbpa93ijzbhw9f.jpg',
      price: 220,
      category: coffeeDrinks,
    },
    {
      name: 'Айс Латте',
      description: 'Охлаждённый латте со льдом.',
      img: 'https://static.tildacdn.com/stor3961-6537-4063-b734-343261343133/39744883.jpg',
      price: 230,
      category: coldDrinks,
    },
    {
      name: 'Фраппучино',
      description: 'Сливочный ледяной напиток.',
      img: 'https://budnikofe.ru/sites/default/files/inline-images/Frappuchino3_0.jpg',
      price: 250,
      category: coldDrinks,
    },

    // Десерты
    {
      name: 'Чизкейк Нью-Йорк',
      description: 'Классический чизкейк с ванилью.',
      img: 'https://i.obozrevatel.com/food/recipemain/2019/2/8/999470-880x544.jpg?size=636x424',
      price: 270,
      category: cakes,
    },
    {
      name: 'Медовик',
      description: 'Медовый торт с кремом.',
      img: 'https://cdn.lifehacker.ru/wp-content/uploads/2022/11/shutterstock_2154067297_1668017816-scaled.jpg',
      price: 250,
      category: cakes,
    },
    {
      name: 'Тирамису',
      description: 'Итальянский десерт с кофе и маскарпоне.',
      img: 'https://lasunka.com/s165-prew.jpg',
      price: 290,
      category: cakes,
    },

    // Чай
    {
      name: 'Чёрный чай',
      description: 'Классический черный чай.',
      img: 'https://sakiproducts.com/cdn/shop/articles/Benefits-of-Drinking-Black-Tea-thumbnail_800x800.jpg?v=1660832924',
      price: 100,
      category: teaDrinks,
    },
    {
      name: 'Зелёный чай',
      description: 'Освежающий зелёный чай.',
      img: 'https://aumishop.ru/image/catalog/-%D0%BD%D0%BE%D0%B2%D1%8B%D0%B5-2020/polza-zelenogo-chaya.jpg',
      price: 110,
      category: teaDrinks,
    },
    {
      name: 'Матча латте',
      description: 'Зелёный чай с молоком.',
      img: 'https://coffee-static.storage.yandexcloud.net/files/shares/data/blog/matcha-latte/image5.jpg',
      price: 190,
      category: teaDrinks,
    },
  ];

  // Создаём продукты
  for (const product of products) {
    await prisma.product.create({
      data: {
        name: product.name,
        description: product.description,
        img: product.img,
        price: product.price,
        productCategoryId: product.category.id,
      },
    });
  }

  console.log('✅ Полное наполнение базы завершено!');
}

main()
  .catch((e) => {
    console.error('❌ Ошибка:', e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
