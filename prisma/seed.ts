import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create Categories and Subcategories
  const coffeeCategory = await prisma.category.create({
    data: {
      name: 'Coffee',
      subCategory: {
        create: [
          {
            name: 'Espresso',
            img: 'https://fs1.jura.com.ua/content/news/a14/1x1/664b076c9de4c.png',
            product: {
              create: [
                {
                  name: 'Espresso',
                  description:
                    "Espresso is a delicious concentrated form of coffee, served in shots. It's often the base of many other beverages, such as cappuccino, latte, americano, and macchiato.",
                  img: 'https://fs1.jura.com.ua/content/news/a14/1x1/664b076c9de4c.png',
                  price: 3.5,
                },
                {
                  name: 'Latte',
                  description:
                    'A latte or caffè latte is a milk coffee that boasts a silky layer of foam. It is made with one or two shots of espresso, steamed milk, and a final, thin layer of frothed milk on top.',
                  img: 'https://131899205.cdn6.editmysite.com/uploads/1/3/1/8/131899205/s488650153937811732_p57_i1_w1500.jpeg',
                  price: 4.0,
                },
                {
                  name: 'Cappuccino',
                  description:
                    'A cappuccino is a beloved espresso-based hot coffee drink made with layering of espresso, steamed milk, and milk foam on top.',
                  img: 'https://merriam-webster.com/assets/mw/images/article/art-wap-landing-mp-lg/cappuccino-2029-e80b7c6d318c7862df2c4c8623a11f99@1x.jpg',
                  price: 4.5,
                },
              ],
            },
          },
          {
            name: 'Cold Coffee',
            img: 'https://static.toiimg.com/thumb/53842591.cms?imgsize=1077535&width=800&height=800',
            product: {
              create: [
                {
                  name: 'Iced Coffee',
                  description:
                    'Iced coffee is a coffee beverage served cold. It may be prepared by brewing coffee and then serving it over ice or in cold milk.',
                  img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIbV5MB5i_k9stP0RuJnH_M01BL_YtUQ65-A&s',
                  price: 3.0,
                },
                {
                  name: 'Cortado',
                  description:
                    'Cortado is a Spanish-inspired coffee beverage that combines equal parts of espresso and warm milk, creating a balanced and flavorful drink.',
                  img: 'https://perfectdailygrind.com/wp-content/uploads/2020/03/Cortado-Gibraltar-glass.jpg',
                  price: 3.2,
                },
              ],
            },
          },
        ],
      },
    },
  });

  const teaCategory = await prisma.category.create({
    data: {
      name: 'Tea',
      subCategory: {
        create: [
          {
            name: 'Black Tea',
            img: 'https://sakiproducts.com/cdn/shop/articles/Benefits-of-Drinking-Black-Tea-thumbnail_640x640.jpg?v=1660832924',
            product: {
              create: [
                {
                  name: 'Black Tea',
                  description:
                    'Black tea is a type of tea produced from the camellia sinensis plant that is highly oxidized, resulting in a dark reddish-gold hue.',
                  img: 'https://sakiproducts.com/cdn/shop/articles/Benefits-of-Drinking-Black-Tea-thumbnail_640x640.jpg?v=1660832924',
                  price: 2.5,
                },
              ],
            },
          },
        ],
      },
    },
  });

  // Create Users
  const hashedPassword = await bcrypt.hash('password123', 10);

  const user = await prisma.user.create({
    data: {
      email: 'john.doe@example.com',
      name: 'John Doe',
      password: hashedPassword,
      role: 'user',
    },
  });

  // Create Cart for User

  console.log('Database has been seeded!');
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
