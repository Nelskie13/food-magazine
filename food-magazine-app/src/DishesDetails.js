import { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Stack,
  List,
  ListItem,
  Button,
  Input,
} from "@chakra-ui/react";

function DishDetails({ recipe, onEdit, onExit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedRecipe, setEditedRecipe] = useState(recipe);

  const handleExit = () => {
    onExit(); // Call the onExit prop when the exit button is clicked
  };

  const handleEdit = () => {
    setIsEditing(!isEditing); // Toggle the isEditing state
  };

  const handleSave = () => {
    setIsEditing(false);
    onEdit(editedRecipe);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedRecipe(recipe);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedRecipe((prevRecipe) => ({
      ...prevRecipe,
      [name]: value,
    }));
  };

  const handleIngredientChange = (e, index) => {
    const { name, value } = e.target;
    setEditedRecipe((prevRecipe) => {
      const ingredients = [...prevRecipe.ingredients];
      ingredients[index][name] = value;
      return {
        ...prevRecipe,
        ingredients,
      };
    });
  };

  return (
    <Box p={6} bg="white" boxShadow="lg" borderRadius="lg">
      <Heading as="h2" size="lg" mb={2}>
        {isEditing ? (
          <Input
            name="recipeName"
            value={editedRecipe.recipeName}
            onChange={handleInputChange}
            autoFocus
            placeholder="Recipe Name"
          />
        ) : (
          recipe.recipeName
        )}
      </Heading>
      <Text color="gray.500" mb={4}>
        Category: {""}
        {isEditing ? (
          <Input
            name="category"
            value={editedRecipe.category}
            onChange={handleInputChange}
          />
        ) : (
          recipe.category
        )}
      </Text>
      <Heading as="h3" size="md" mb={2}>
        Ingredients:
      </Heading>
      {isEditing ? (
        <List>
          {editedRecipe.ingredients.map((ingredient, index) => (
            <ListItem key={index}>
              <Input
                name="name"
                value={ingredient.name}
                onChange={(e) => handleIngredientChange(e, index)}
                placeholder={`Ingredient ${index + 1} Name`}
              />
              -
              <Input
                name="measurement"
                value={ingredient.measurement}
                onChange={(e) => handleIngredientChange(e, index)}
                placeholder={`Ingredient ${index + 1} Measurement`}
              />
              <p>----------------------------------------------</p>
            </ListItem>
          ))}
        </List>
      ) : (
        <List>
          {recipe.ingredients.map((ingredient, index) => (
            <ListItem key={index}>
              {ingredient.name} - {ingredient.measurement}
            </ListItem>
          ))}
        </List>
      )}

      {isEditing ? (
        <Stack direction="row" spacing={2} mt={4}>
          <Button colorScheme="green" size="sm" onClick={handleSave}>
            Save
          </Button>
          <Button colorScheme="red" size="sm" onClick={handleCancel}>
            Cancel
          </Button>
        </Stack>
      ) : (
        <Stack direction="row" spacing={2} mt={4}>
          <Button colorScheme="blue" size="sm" onClick={handleEdit}>
            Edit
          </Button>
          <Button colorScheme="gray" size="sm" onClick={handleExit}>
            Exit
          </Button>
        </Stack>
      )}
    </Box>
  );
}

export default DishDetails;
