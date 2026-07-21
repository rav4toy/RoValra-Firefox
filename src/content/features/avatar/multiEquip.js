import { getIdsByCategory, getIdsBySubcategory } from '../../core/utils/itemCategories.js';
import { dispatchPageEvent } from '../../core/firefox/pageBridge.js';

export function init() {
    const updateState = async (enabled) => {
        dispatchPageEvent(document, 'rovalra-multi-equip', { enabled });

        if (enabled) {
            try {
                const [accData, clothingData, hairData] = await Promise.all([
                    getIdsByCategory('Accessories'),
                    getIdsByCategory('Clothing'),
                    getIdsBySubcategory('HairAccessories')
                ]);

                const accIds = new Set(accData?.assetTypeIds || []);
                if (hairData?.assetTypeIds) hairData.assetTypeIds.forEach(id => accIds.add(id));

                dispatchPageEvent(document, 'rovalra-multi-equip', {
                    enabled,
                    accessories: Array.from(accIds),
                    layered: clothingData?.assetTypeIds || [],
                });
            } catch (e) {
                console.warn("RoValra: Failed to fetch dynamic categories for multi-equip", e);
            }
        }
    };

    chrome.storage.local.get('multiEquipEnabled', (data) => {
        updateState(data.multiEquipEnabled === true);
    });

    chrome.storage.onChanged.addListener((changes, namespace) => {
        if (namespace === 'local' && changes.multiEquipEnabled) {
            updateState(changes.multiEquipEnabled.newValue === true);
        }
    });
}
