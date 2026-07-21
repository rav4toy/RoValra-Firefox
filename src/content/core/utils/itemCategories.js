import { callRobloxApiJson } from '../api.js';

let categoriesCache = null;
let pendingPromise = null;

async function fetchCategories() {
    if (categoriesCache) return categoriesCache;
    if (pendingPromise) return pendingPromise;

    pendingPromise = (async () => {
        try {
            const data = await callRobloxApiJson({
                subdomain: 'catalog',
                endpoint: '/v1/categories',
                method: 'GET',
            });

            const processed = [];
            const classicSubcats = [
                'ClassicShirts',
                'ClassicTShirts',
                'ClassicPants',
            ];

            for (const rawCategory of Array.isArray(data) ? data : []) {
                const cat = {
                    ...rawCategory,
                    assetTypeIds: Array.isArray(rawCategory.assetTypeIds)
                        ? [...rawCategory.assetTypeIds]
                        : [],
                    bundleTypeIds: Array.isArray(rawCategory.bundleTypeIds)
                        ? [...rawCategory.bundleTypeIds]
                        : [],
                    subcategories: Array.isArray(rawCategory.subcategories)
                        ? rawCategory.subcategories.map((subcategory) => ({
                              ...subcategory,
                              assetTypeIds: Array.isArray(
                                  subcategory.assetTypeIds,
                              )
                                  ? [...subcategory.assetTypeIds]
                                  : [],
                              bundleTypeIds: Array.isArray(
                                  subcategory.bundleTypeIds,
                              )
                                  ? [...subcategory.bundleTypeIds]
                                  : [],
                          }))
                        : [],
                };

                if (cat.category === 'Clothing') {
                    const clothingSubcats = [];
                    const classicSubcategoryObjects = [];
                    const classicAssetTypeIds = new Set();

                    cat.subcategories.forEach((sub) => {
                        if (classicSubcats.includes(sub.subcategory)) {
                            classicSubcategoryObjects.push(sub);
                            sub.assetTypeIds.forEach((id) =>
                                classicAssetTypeIds.add(id),
                            );
                        } else {
                            clothingSubcats.push(sub);
                        }
                    });

                    processed.push({
                        ...cat,
                        subcategories: clothingSubcats,
                        assetTypeIds: cat.assetTypeIds.filter(
                            (id) => !classicAssetTypeIds.has(id),
                        ),
                    });

                    if (classicSubcategoryObjects.length > 0) {
                        processed.push({
                            category: 'ClassicClothing',
                            assetTypeIds: Array.from(classicAssetTypeIds),
                            bundleTypeIds: [],
                            categoryId: 999,
                            name: 'Classic Clothing',
                            orderIndex: cat.orderIndex,
                            subcategories: classicSubcategoryObjects,
                            isSearchable: true,
                        });
                    }
                } else {
                    processed.push(cat);
                }
            }

            categoriesCache = processed;
            return processed;
        } catch (error) {
            console.error('RoValra: Failed to fetch item categories', error);
            categoriesCache = [];
            return [];
        }
    })();

    return pendingPromise;
}

export async function getAllCategories() {
    return await fetchCategories();
}

export async function getIdsByCategory(categoryName) {
    const categories = await fetchCategories();
    const cat = categories.find(
        (category) =>
            category.category === categoryName ||
            category.name === categoryName,
    );

    if (!cat) return null;

    return {
        assetTypeIds: cat.assetTypeIds || [],
        bundleTypeIds: cat.bundleTypeIds || [],
    };
}

export async function getIdsBySubcategory(subcategoryName) {
    const categories = await fetchCategories();

    for (const cat of categories) {
        const sub = (cat.subcategories || []).find(
            (subcategory) =>
                subcategory.subcategory === subcategoryName ||
                subcategory.name === subcategoryName,
        );
        if (sub) {
            return {
                assetTypeIds: sub.assetTypeIds || [],
                bundleTypeIds: sub.bundleTypeIds || [],
            };
        }
    }

    return null;
}
