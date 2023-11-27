export const retrieveDataFromFirestore = async (db) => {
    try {
      const sectorsSnapshot = await db.collection('sectors').get();
      const retrievedDataArray = [];
  
      await Promise.all(
        sectorsSnapshot.docs.map(async (sectorDoc) => {
          const sectorData = sectorDoc.data();
          const optionsArray = [];
  
          const optionsSnapshot = await sectorDoc.ref.collection('options').get();
  
          await Promise.all(
            optionsSnapshot.docs.map(async (optionDoc) => {
              const optionData = optionDoc.data();
              const subOptionsArray = [];
  
              if (optionData) {
                const subOptionsSnapshot = await optionDoc.ref.collection('subOptions').get();
  
                await Promise.all(
                  subOptionsSnapshot.docs.map(async (subOptionDoc) => {
                    const subOptionData = subOptionDoc.data();
                    const grandSubOptionsArray = [];
  
                    if (subOptionData) {
                      const grandSubOptionsSnapshot = await subOptionDoc.ref.collection('subOptions').get();
  
                      grandSubOptionsSnapshot.docs.forEach((grandSubOptionDoc) => {
                        const grandSubOptionData = grandSubOptionDoc.data();
                        grandSubOptionsArray.push({
                          option: grandSubOptionData.name,
                          code: grandSubOptionData.code,
                        });
                      });
                    }
  
                    subOptionsArray.push({
                      option: subOptionDoc.data().name,
                      code: subOptionData.code,
                      subOptions: grandSubOptionsArray.length > 0 ? grandSubOptionsArray : undefined,
                    });
                  })
                );
              }
  
              optionsArray.push({
                option: optionDoc.data().name,
                code: optionData.code,
                subOptions: subOptionsArray.length > 0 ? subOptionsArray : undefined,
              });
            })
          );
  
          retrievedDataArray.push({
            sector: sectorDoc.id,
            code: sectorData.code,
            options: optionsArray,
          });
        })
      );
      return retrievedDataArray;
    } catch (error) {
      console.error('Error retrieving data:', error);
      return [];
    }
  };