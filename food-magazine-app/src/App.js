import {
  ChakraProvider,
  List,
  extendTheme,
  Modal,
  ModalOverlay,
  ModalContent,
} from "@chakra-ui/react";

import AddRecipe from "./AddRecipe";
import { useState } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Grid,
  GridItem,
  Image,
  Button,
  Stack,
} from "@chakra-ui/react";
import DishesDetails from "./DishesDetails";
// Extend Chakra UI theme to customize styles
const theme = extendTheme({
  colors: {
    primary: "#34D399",
  },
});

function App() {
  const [recipes, setRecipes] = useState([
    {
      recipeName: "Chicken Adobo",
      category: "Main Course",
      ingredients: [
        { name: "Chicken", measurement: "1 kg" },
        { name: "Vinegar", measurement: "1/2 cup" },
        { name: "Soy Sauce", measurement: "1/2 cup" },
        { name: "Garlic", measurement: "5 cloves" },
        { name: "Peppercorns", measurement: "1 teaspoon" },
      ],
      image:
        "https://www.seriouseats.com/thmb/uc8nb040OwgXekR9obuhEqm8WoI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__2019__10__20191023-chicken-adobo-vicky-wasik-19-12ce105a2e1a44dfb1e2673775118064.jpg",
    },
    {
      recipeName: "Sinigang",
      category: "Soup",
      ingredients: [
        { name: "Pork", measurement: "500g" },
        { name: "Tamarind", measurement: "2 cups" },
        { name: "Tomatoes", measurement: "2 pieces" },
        { name: "Vegetables", measurement: "Assorted" },
      ],
      image: "https://assets.unileversolutions.com/recipes-v2/237863.png",
    },
    {
      recipeName: "Lechon",
      category: "Main Course",
      ingredients: [
        { name: "Pork", measurement: "5 kg" },
        { name: "Salt", measurement: "1/2 cup" },
        { name: "Pepper", measurement: "1/4 cup" },
        { name: "Garlic", measurement: "1 bulb" },
        { name: "Bay Leaves", measurement: "5 leaves" },
      ],
      image:
        "https://milaslechon.com.ph/wp-content/uploads/2018/11/lechon_6.jpg",
    },
    {
      recipeName: "Halo-Halo",
      category: "Dessert",
      ingredients: [
        { name: "Shaved Ice", measurement: "4 cups" },
        { name: "Sweet Beans", measurement: "1/2 cup" },
        { name: "Jellies", measurement: "Assorted" },
        { name: "Fruits", measurement: "Assorted" },
        { name: "Evaporated Milk", measurement: "1/2 cup" },
        { name: "Leche Flan", measurement: "1 piece" },
      ],
      image:
        "https://www.bhg.com/thmb/xP6vr6usB1_phcXnXE75YkUcH7g=/4000x0/filters:no_upscale():strip_icc()/BHG-Halo-Halo-Hero-6MKIKIe-ar386nzeJOHjW_-354671c880d441aba6a75e75e59b1066.jpg",
    },
    {
      recipeName: "Sisig",
      category: "Appetizer",
      ingredients: [
        { name: "Pig's Head", measurement: "1 kg" },
        { name: "Pig's Liver", measurement: "250g" },
        { name: "Calamansi", measurement: "10 pieces" },
        { name: "Onions", measurement: "2 pieces" },
        { name: "Chili Peppers", measurement: "5 pieces" },
        { name: "Cooking Oil", measurement: "3 tablespoons" },
      ],
      image:
        "https://images.deliveryhero.io/image/foodpanda/recipes/sisig-recipe-2.jpg",
    },
    {
      recipeName: "Kare-Kare",
      category: "Main Course",
      ingredients: [
        { name: "Oxtail", measurement: "1 kg" },
        { name: "Tripe", measurement: "500g" },
        { name: "Eggplant", measurement: "4 pieces" },
        { name: "String Beans", measurement: "1/2 pound" },
        { name: "Peanut Butter", measurement: "1 cup" },
        { name: "Bagoong", measurement: "1/2 cup" },
      ],
      image:
        "https://images.aws.nestle.recipes/resized/af78558684736b541f41416b652b5eed_MMS_K_0102_1900px_944_531.jpg",
    },
  ]);

  const [showDetailsIndex, setShowDetailsIndex] = useState(-1);
  const [isEditing, setIsEditing] = useState(false);

  const toggleDetails = (index) => {
    setShowDetailsIndex(index);
    setIsEditing(index !== -1); // Set isEditing to true when a recipe is clicked, and false when -1 (no recipe is being edited)
  };

  const removeRecipe = (index) => {
    const updatedRecipes = [...recipes];
    updatedRecipes.splice(index, 1);
    setRecipes(updatedRecipes);
  };

  const editRecipe = (index, updatedRecipe) => {
    const updatedRecipes = [...recipes];
    updatedRecipes[index] = updatedRecipe;
    setRecipes(updatedRecipes);
  };

  const handleAddRecipe = (newRecipe) => {
    setRecipes([...recipes, newRecipe]);
  };

  const initialRecipe = {
    recipeName: "",
    category: "",
    ingredients: [
      { name: "", measurement: "" },
      { name: "", measurement: "" },
      { name: "", measurement: "" },
      { name: "", measurement: "" },
      { name: "", measurement: "" },
      { name: "", measurement: "" },
    ],
    image: "",
  };

  return (
    <ChakraProvider theme={theme}>
      <Box bg="gray.100" py={10}>
        <Container maxW="container.xl">
          <Heading as="h1" size="xl" textAlign="center" mb={10} color="primary">
            Philippines Best Food!
          </Heading>

          {/* Add Recipe Button */}
          <AddRecipe onAdd={handleAddRecipe} initialRecipe={initialRecipe} />
          <Grid templateColumns="repeat(3, 1fr)" gap={8}>
            {recipes.map((recipe, index) => (
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
                    src={recipe.image}
                    alt={recipe.recipeName}
                    objectFit="cover"
                    h={64}
                    mb={4}
                    borderRadius="md"
                  />
                  <List spacing={2}>
                    <Heading as="h2" size="lg" mb={2}>
                      {recipe.recipeName}
                    </Heading>
                    <Text color="gray.500" fontSize="sm">
                      Category: {recipe.category}
                    </Text>
                    <Heading as="h3" size="md" mb={2} mt={4}>
                      Ingredients:
                    </Heading>
                    <List ml={6}>
                      <ul>
                        {recipe.ingredients.map((ingredient, idx) => (
                          <li key={idx}>
                            {ingredient.name} - {ingredient.measurement}
                          </li>
                        ))}
                      </ul>
                    </List>
                  </List>

                  {/* Edit and Remove Buttons */}
                  <Stack direction="row" spacing={2} mt={4}>
                    {isEditing && showDetailsIndex === index ? (
                      <>
                        <Button
                          colorScheme="green"
                          size="sm"
                          onClick={() => editRecipe(index, recipe)}
                        >
                          Save
                        </Button>
                        <Button
                          colorScheme="red"
                          size="sm"
                          onClick={() => toggleDetails(index)}
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          colorScheme="blue"
                          size="sm"
                          onClick={() => toggleDetails(index)}
                        >
                          Edit
                        </Button>
                        <Button
                          colorScheme="red"
                          size="sm"
                          onClick={() => removeRecipe(index)}
                        >
                          Remove
                        </Button>
                      </>
                    )}
                  </Stack>
                  {showDetailsIndex === index && (
                    <Modal
                      isOpen={showDetailsIndex !== -1}
                      onClose={() => toggleDetails(-1)} // Set showDetailsIndex to -1 when the modal is closed
                    >
                      <ModalOverlay />
                      <ModalContent>
                        <DishesDetails
                          recipe={recipe}
                          onEdit={(editedRecipe) =>
                            editRecipe(index, editedRecipe)
                          }
                          onExit={() => toggleDetails(-1)} // Set showDetailsIndex to -1 when the exit button is clicked
                        />
                      </ModalContent>
                    </Modal>
                  )}
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
