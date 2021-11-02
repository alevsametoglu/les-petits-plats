import recipes from './recipes.js';
// filter recipes by for (boucle Native)
function searchText(text, searchKey) {
    let count = 0;
    for (let i = 0; i < text.length; i++) {
        for (let j = 0; j < searchKey.length; j++) {
            if (searchKey[j] !== text[i + j]) break;
            if (j === searchKey.length - 1) count++;
        }
    }
    return count;
}

const searchOnRecipes = (searchingList, searchKey) => {
    // console.log(searchKey, searchingList);
    const filteredRecipes = [];
    const searchKeyLower = searchKey.toLowerCase();
    for (let i = 0; i < searchingList.length; i++) {
        const recipe = searchingList[i];
        let text = recipe.name + ' ' + recipe.description;

        for (let y = 0; y < recipe.ingredients.length; y++) {
            const ingredient = recipe.ingredients[y];
            text = text + ' ' + ingredient.ingredient;
        }

        if (searchText(text, searchKeyLower) > 0) {
            filteredRecipes.push(recipe);
        }
    }

    // console.log(filteredRecipes);
    return filteredRecipes;
};

class API {
    static getUtensils(searchKey) {
        const uniqUtensils = [];

        const utensils = recipes.map((recipe) => recipe.ustensils).flat();
        utensils.forEach((utensil) => {
            if (!uniqUtensils.includes(utensil)) uniqUtensils.push(utensil);
        });
        if (!searchKey) return uniqUtensils;
        else {
            searchKey = searchKey.toLowerCase();
            const filteredUtensils = uniqUtensils.filter((utensil) => {
                const isInclude = utensil.toLowerCase().includes(searchKey);
                return isInclude;
            });
            return filteredUtensils;
        }
    }

    static getIngredients(searchKey) {
        const uniqIngredients = [];
        const ingredients = recipes.map((recipe) => recipe.ingredients).flat();

        ingredients.forEach((item) => {
            if (!uniqIngredients.includes(item.ingredient)) uniqIngredients.push(item.ingredient);
        });

        if (!searchKey) return uniqIngredients;
        else {
            searchKey = searchKey.toLowerCase();
            const filteredIngredients = uniqIngredients.filter((ingredient) => {
                const isInclude = ingredient.toLowerCase().includes(searchKey);
                return isInclude;
            });
            return filteredIngredients;
        }
    }

    static getUtils = (searchKey) => {
        const uniqUtils = [];
        const utils = recipes.map((recipe) => recipe.appliance);
        utils.forEach((util) => {
            if (!uniqUtils.includes(util)) uniqUtils.push(util);
        });
        if (!searchKey) return uniqUtils;
        else {
            searchKey = searchKey.toLowerCase();
            const filteredUtils = uniqUtils.filter((util) => {
                const isInclude = util.toLowerCase().includes(searchKey);
                return isInclude;
            });
            return filteredUtils;
        }
    };

    static getRecipes = (filterParams) => {
        console.log(filterParams);
        if (!filterParams) return recipes;
        const { utils, ingredients, utensils, searchKey } = filterParams;

        const _recipes = searchKey ? searchOnRecipes(recipes, searchKey) : recipes;

        if (!utils && !ingredients && !utensils) return _recipes;
        if (utils.length === 0 && ingredients.length === 0 && utensils.length === 0) return _recipes;

        const filteredRecipes = [];

        _recipes.forEach((recipe) => {
            const isIngredientsExist = ingredients.every((ingredient) =>
                recipe.ingredients.some((x) => x.ingredient === ingredient),
            );
            const isUtilsExist = utils.every((util) => recipe.appliance.includes(util));

            const isUtensilsExist = utensils.every((utensil) => recipe.ustensils.includes(utensil));

            // filtered tag by tag
            // if (isIngredientsExist) filteredRecipes.push(recipe);
            // if (isUtilsExist) filteredRecipes.push(recipe);
            // if (isUtensilsExist) filteredRecipes.push(recipe);

            // filtered
            if (isUtilsExist && isIngredientsExist && isUtensilsExist) filteredRecipes.push(recipe);
        });

        return filteredRecipes;
    };
}

export default API;
