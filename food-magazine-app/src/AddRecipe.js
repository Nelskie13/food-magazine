import { useState } from "react";
import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  VStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Divider,
} from "@chakra-ui/react";

function AddRecipe({ onAdd, initialRecipe }) {
  const [isOpen, setIsOpen] = useState(false);
  const [recipe, setRecipe] = useState(initialRecipe);
  const [errors, setErrors] = useState({});
  const [ingredientValues, setIngredientValues] = useState([
    { name: "", measurement: "" },
  ]);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setRecipe(initialRecipe);
    setErrors({});
    setIngredientValues([{ name: "", measurement: "" }]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      [name]: value,
    }));
  };

  const handleIngredientChange = (e, index) => {
    const { name, value } = e.target;
    setIngredientValues((prevValues) => {
      const updatedValues = [...prevValues];
      updatedValues[index] = { ...updatedValues[index], [name]: value };
      return updatedValues;
    });
  };

  const handleAddIngredientForm = () => {
    setIngredientValues((prevValues) => [
      ...prevValues,
      { name: "", measurement: "" },
    ]);
  };

  const handleRemoveIngredientForm = (index) => {
    setIngredientValues((prevValues) => {
      const updatedValues = [...prevValues];
      updatedValues.splice(index, 1);
      return updatedValues;
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!recipe.image) {
      newErrors.image = "Image URL is required";
    }
    if (!recipe.recipeName) {
      newErrors.recipeName = "Recipe Name is required";
    }
    if (!recipe.category) {
      newErrors.category = "Category is required";
    }
    if (ingredientValues.some((ingredient) => !ingredient.name.trim())) {
      newErrors.ingredients = "Ingredient Name is required";
    }
    if (ingredientValues.some((ingredient) => !ingredient.measurement.trim())) {
      newErrors.ingredients = "Ingredient Measurement is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddRecipe = () => {
    if (validateForm()) {
      const updatedRecipe = {
        ...recipe,
        ingredients: ingredientValues,
      };
      onAdd(updatedRecipe);
      handleClose();
    }
  };

  return (
    <>
      <Button colorScheme="green" onClick={handleOpen} mb={4}>
        Add Recipe
      </Button>

      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Recipe</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl isInvalid={errors.image} id="image" isRequired>
                <FormLabel>Picture URL</FormLabel>
                <Input
                  type="text"
                  name="image"
                  value={recipe.image}
                  onChange={handleInputChange}
                  placeholder="Picture URL"
                />
                <FormErrorMessage>{errors.image}</FormErrorMessage>
              </FormControl>

              {recipe.image && (
                <img
                  src={recipe.image}
                  alt="Recipe"
                  style={{ maxWidth: "100%", marginBottom: "1rem" }}
                />
              )}

              <FormControl
                isInvalid={errors.recipeName}
                id="recipeName"
                isRequired
              >
                <FormLabel>Recipe Name</FormLabel>
                <Input
                  type="text"
                  name="recipeName"
                  value={recipe.recipeName}
                  onChange={handleInputChange}
                  placeholder="Recipe Name"
                />
                <FormErrorMessage>{errors.recipeName}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.category} id="category" isRequired>
                <FormLabel>Category</FormLabel>
                <Input
                  type="text"
                  name="category"
                  value={recipe.category}
                  onChange={handleInputChange}
                  placeholder="Category"
                />
                <FormErrorMessage>{errors.category}</FormErrorMessage>
              </FormControl>

              {ingredientValues.map((ingredient, index) => (
                <Box key={index} isRequired>
                  <FormControl
                    id={`ingredientName${index}`}
                    isRequired
                    isInvalid={!ingredient.name.trim()}
                  >
                    <FormLabel>{`Ingredient ${index + 1} Name`}</FormLabel>
                    <Input
                      type="text"
                      name="name"
                      value={ingredient.name}
                      onChange={(e) => handleIngredientChange(e, index)}
                      placeholder={`Ingredient ${index + 1} Name`}
                    />
                    <FormErrorMessage>
                      {ingredient.name === "" && "Ingredient Name is required"}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl
                    id={`ingredientMeasurement${index}`}
                    isRequired
                    isInvalid={!ingredient.measurement.trim()}
                  >
                    <FormLabel>{`Ingredient ${
                      index + 1
                    } Measurement`}</FormLabel>
                    <Input
                      type="text"
                      name="measurement"
                      value={ingredient.measurement}
                      onChange={(e) => handleIngredientChange(e, index)}
                      placeholder={`Ingredient ${index + 1} Measurement`}
                    />
                    <FormErrorMessage>
                      {ingredient.measurement === "" &&
                        "Ingredient Measurement is required"}
                    </FormErrorMessage>
                  </FormControl>

                  {index !== 0 && (
                    <Button
                      colorScheme="red"
                      size="sm"
                      mt={2}
                      onClick={() => handleRemoveIngredientForm(index)}
                    >
                      Remove
                    </Button>
                  )}

                  <Divider my={4} />
                </Box>
              ))}

              <Button colorScheme="green" onClick={handleAddIngredientForm}>
                Add More
              </Button>
              <FormErrorMessage>{errors.ingredients}</FormErrorMessage>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleAddRecipe}>
              Add Recipe
            </Button>
            <Button variant="ghost" onClick={handleClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddRecipe;
