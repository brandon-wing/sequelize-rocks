const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
  const allCategories = await Category.findAll({
    include: {
      model: Product
    }
  });
  res.json(allCategories)
      }
      catch (err){
        res.status(500).json(err);
      }

});

router.get('/:id', async (req, res) => {
    // find one category by its `id` value
  // be sure to include its associated Products
  try{
    const oneCategory = await Category.findByPk(req.params.id, {
      include: {
        model: Product
      }
    });
    res.json(oneCategory)
  }
  catch (err){
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body);
    res.json(newCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});



router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
  let updatedCategory = await Category.update(req.body, {
    where: {
      id: req.params.id,
    }
  });
  //show that it has been updated
  res.json(updatedCategory);
}
catch (err){
  res.status(500).json(err);
}

});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryToDelete = await Category.destroy({
      where: {
        id: req.params.id,
      }
    })
    res.status(200).json("deleted!");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
