import { ChakraProvider } from "@chakra-ui/react";
import {
  Box,
  Container,
  Heading,
  Text,
  Grid,
  GridItem,
  Image,
} from "@chakra-ui/react";

function App() {
  const dishes = [
    {
      image:
        "https://www.seriouseats.com/thmb/uc8nb040OwgXekR9obuhEqm8WoI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__2019__10__20191023-chicken-adobo-vicky-wasik-19-12ce105a2e1a44dfb1e2673775118064.jpg",
      title: "Chicken Adobo",
      description:
        "Chicken Adobo is a popular Filipino dish marinated in vinegar, soy sauce, garlic, and spices. It's cooked until tender and flavorful.",
      author: "John Doe",
      publishedDate: "Published on July 1, 2023",
    },
    {
      image: "https://assets.unileversolutions.com/recipes-v2/237863.png",
      title: "Sinigang",
      description:
        "Sinigang is a sour soup made with tamarind, tomatoes, vegetables, and your choice of meat. It's a comforting and tangy dish.",
      author: "Jane Smith",
      publishedDate: "Published on June 28, 2023",
    },
    {
      image:
        "https://milaslechon.com.ph/wp-content/uploads/2018/11/lechon_6.jpg",
      title: "Lechon",
      description:
        "Lechon is a roasted whole pig dish that is often the centerpiece of celebrations in the Philippines. It has a crispy skin and succulent meat.",
      author: "Mike Johnson",
      publishedDate: "Published on June 20, 2023",
    },
    {
      image:
        "https://www.bhg.com/thmb/xP6vr6usB1_phcXnXE75YkUcH7g=/4000x0/filters:no_upscale():strip_icc()/BHG-Halo-Halo-Hero-6MKIKIe-ar386nzeJOHjW_-354671c880d441aba6a75e75e59b1066.jpg",
      title: "Halo-Halo",
      description:
        "Halo-Halo is a popular Filipino dessert made with a mix of various ingredients, including shaved ice, sweet beans, jellies, fruits, and topped with evaporated milk and leche flan.",
      author: "Anna Lee",
      publishedDate: "Published on July 5, 2023",
    },
    {
      image:
        "https://images.deliveryhero.io/image/foodpanda/recipes/sisig-recipe-2.jpg",
      title: "Sisig",
      description:
        "Sisig is a sizzling dish made from parts of a pig's head and liver. It's usually seasoned with calamansi, onions, and chili peppers, and is often served with rice.",
      author: "Carlos Santos",
      publishedDate: "Published on July 7, 2023",
    },
    {
      image:
        "https://images.aws.nestle.recipes/resized/af78558684736b541f41416b652b5eed_MMS_K_0102_1900px_944_531.jpg",
      title: "Kare-Kare",
      description:
        "Kare-Kare is a Filipino stew made with oxtail, tripe, and vegetables, cooked in a peanut-based sauce. It's commonly served with bagoong (fermented shrimp paste) on the side.",
      author: "Liza Fernandez",
      publishedDate: "Published on July 9, 2023",
    },
  ];

  return (
    <ChakraProvider>
      <Box bg="gray.100" py={10}>
        <Container maxW="container.xl">
          <Heading
            as="h1"
            size="xl"
            textAlign="center"
            mb={10}
            color={"green.500"}
          >
            Philippines Best Food!
          </Heading>

          <Grid templateColumns="repeat(3, 1fr)" gap={8}>
            {dishes.map((article, index) => (
              <GridItem key={index}>
                <Box
                  p={6}
                  bg="white"
                  boxShadow="lg"
                  borderRadius="lg"
                  _hover={{ boxShadow: "xl", transform: "scale(1.02)" }}
                  transition="all 0.3s ease"
                >
                  <Image
                    src={article.image}
                    alt={article.title}
                    objectFit="cover"
                    h={64}
                    mb={4}
                  />
                  <Heading as="h2" size="lg" mb={2}>
                    {article.title}
                  </Heading>
                  <Text color="gray.500" mb={4}>
                    {article.description}
                  </Text>
                  <Text fontWeight="bold">By {article.author}</Text>
                  <Text color="gray.500">{article.publishedDate}</Text>
                </Box>
              </GridItem>
            ))}
          </Grid>
        </Container>
      </Box>
    </ChakraProvider>
  );
}

export default App;
