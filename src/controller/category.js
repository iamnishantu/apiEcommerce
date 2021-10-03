
const Category = require('../models/category');
const slugify = require('slugify');
//   ==========================================================================================================================
//                                                   fatch category & subCategory
//   ==========================================================================================================================

function createCategories(categories, parentId = null){

const categoryList = [];
let category;
if (parentId == null){
 category = categories.filter(cat => cat.parentId == undefined );
  
}else{
	category = categories.filter(cat => cat.parentId == parentId );

}
for(let cat of category){

  categoryList.push({
  	_id: cat._id,
  	name: cat.name,
  	slug: cat.slug,
  	parentId: cat.parentId,
  	children:createCategories(categories,cat._id)
  });
}

return categoryList;

};


//   ==========================================================================================================================
//                                                   fatch category & subCategory END
//   ==========================================================================================================================
exports.addCategory = (req, res) =>{

	


	const CategoryObj = {

		name: req.body.name,
		slug: slugify(req.body.name),

	}

	if (req.file){

		CategoryObj.categoryImage =process.env.API +'/public/' + req.file.filename;

	}

	if (req.body.parentId){

		CategoryObj.parentId = req.body.parentId;


	}
	const cat = new Category (CategoryObj);
	cat.save((error, Category  ) => {


		if (error) return res.status(400).json({ error});

		if (Category){

			return res.status(201).json({Category})
		}
	});
    

}

	exports.getCategories = (req, res) => {
		Category.find({})
		.exec((error, categories) => {
			if (error) return res.status(400).json({ error});

			if(categories){
				const  categoryList  = createCategories(categories);


				res.status(200).json({ categoryList  })
			}
		})
	}





