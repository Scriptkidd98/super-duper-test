const data = [
  {
    sector: 'Manufacturing',
    code: 1,
    options: [
      {
        option: 'Construction materials',
        code: 19,
      },
      {
        option: 'Electronics and Optics',
        code: 18,
      },
      {
        option: 'Food and Beverage',
        code: 6,
        subOptions: [
          {
            option: 'Bakery & confectionery products',
            code: 342,
          },
          {
            option: 'Beverages',
            code: 43,
          },
          {
            option: 'Fish & fish products',
            code: 42
          },
          {
            option: 'Meat & meat products',
            code: 40
          },
          {
            option: 'Milk & dairy products',
            code: 39,
          },
          {
            option: 'Other',
            code: 437
          },
          {
            option: 'Sweets & snack food',
            code: 378
          }
          // ... other sub-options
        ],
      },
      {
        option: 'Furniture',
        code: 13,
        subOptions: [
          {
            option: 'Bathroom/sauna',
            code: 389
          },
          {
            option: 'Bedroom',
            code: 385
          },
          {
            option: "Children's room",
            code: 390
          },
          {
            option: 'Kitchen',
            code: 98
          },
          {
            option: 'Living room',
            code: 101
          },
          {
            option: 'Office',
            code: 392
          },
          {
            option: 'Other (Furniture)',
            code: 394
          },
          {
            option: 'Outdoor',
            code: 341
          },
          {
            option: 'Project furniturer',
            code: 99
          }
        ]
      },
      {
        option: 'Machinery',
        code: 12,
        subOptions: [
          {
            option: 'Machinery components',
            code: 94
          },
          {
            option: 'Machinery equipment/tools',
            code: 91
          },
          {
            option: 'Manufacture of machinery',
            code: 224
          },
          {
            option: 'Maritime',
            code: 97,
            subOptions: [
              {
                option: 'Aluminium and steel workboats',
                code: 271
              },
              {
                option: 'Boat/Yacht building',
                code: 269
              },
              {
                option: 'Ship repair and conversion',
                code: 230
              }
            ]
          },
          {
            option: 'Metal structures',
            code: 93
          },
          {
            option: 'Repair and maintenance service',
            code: 227
          }
        ]
      },
      {
        option: 'Metalworking',
        code: 11,
        subOptions: [
          {
            option: 'Construction of metal structures',
            code: 67
          },
          {
            option: 'Houses and buildings',
            code: 263
          },
          {
            option: 'Metal products',
            code: 267
          },
          {
            option: 'Metal works',
            code: 542,
            subOptions: [
              {
                option: 'CNC-machining',
                code: 75
              },
              {
                option: 'Forgings, Fasteners',
                code: 62
              },
              {
                option: 'Gas, Plasma, Laser cutting',
                code: 69
              },
              {
                option: 'MIG, TIG, Aluminum welding',
                code: 66
              }
            ]
          }
        ]
      },
      {
        option: 'Plastic and Rubber',
        code: 9,
        subOptions: [
          {
            option: 'Packaging',
            code: 54
          },
          {
            option: 'Plastic goods',
            code: 556
          },
          {
            option: 'Plastic processing technology',
            code: 559,
            subOptions: [
              {
                option: 'Blowing',
                code: 55
              },
              {
                option: 'Moulding',
                code: 57
              },
              {
                option: 'Plastics welding and processing',
                code: 53
              }
            ]
          },
          {
            option: 'Plastic profiles',
            code: 560
          }
        ]
      },
      {
        option: 'Printing',
        code: 5,
        subOptions: [
          {
            option: 'Advertising',
            code: 148
          },
          {
            option: 'Book/Periodicals printing',
            code: 150
          },
          {
            option: 'Labelling and packaging printing',
            code: 145
          }
        ]
      },
      {
        option: 'Textile and Clothing',
        code: 7,
        subOptions: [
          {
            option: 'Clothing',
            code: 44
          },
          {
            option: 'Textile',
            code: 45
          }
        ]
      },
      {
        option: 'Wood',
        code: 8,
        subOptions: [
          {
            option: 'Other (Wood)',
            code: 337
          },
          {
            option: 'Wooden building materials',
            code: 51
          },
          {
            option: 'Wooden houses',
            code: 47
          }
        ]
      }
    ],
  },
  {
    sector: 'Other',
    code: 3,
    options: [
      {
        option: 'Creative industries',
        code: 37,
      },
      {
        option: 'Energy technology',
        code: 29,
      },
      {
        option: 'Environment',
        code: 33
      }
    ]
  },
  {
    sector: 'Service',
    code: 2,
    options: [
      {
        option: 'Business services',
        code: 25,
      },
      {
        option: 'Engineering',
        code: 35
      },
      {
        option: 'Information Technology and Telecommunications',
        code: 28,
        subOptions: [
          {
            option: 'Data processing, Web portals, E-marketing',
            code: 581
          },
          {
            option: 'Programming, Consultancy',
            code: 576
          },
          {
            option: 'Software, Hardware',
            code: 121,
          },
          {
            option: 'Telecommunications',
            code: 122
          }
        ],
      },
      {
        option: 'Tourism',
        code: 22
      },
      {
        option: 'Translation services',
        code: 141
      },
      {
        option: 'Transport and Logistics',
        code: 21,
        subOptions: [
          {
            option: 'Air',
            code: 111
          },
          {
            option: 'Rail',
            code: 114
          },
          {
            option: 'Road',
            code: 112
          },
          {
            option: 'Water',
            code: 113
          }
        ]
      }
    ]
  }
];

export const addSectorData = (db) => {
    const storeDataInFirestore = async (data) => {
        try {
          await db.collection('sectors').doc('root').delete();
      
          for (const sector of data) {
            const sectorRef = await db.collection('sectors').doc(sanitizeName(sector.sector));
            await sectorRef.set({
              code: sector.code,
              name: sector.sector,
            });
      
            for (const option of sector.options) {
              const optionRef = await sectorRef.collection('options').doc(sanitizeName(option.option));
              await optionRef.set({
                code: option.code,
                name: option.option,
              });
      
              if (option.subOptions) {
                for (const subOption of option.subOptions) {
                  const subOptionRef = await optionRef.collection('subOptions').doc(sanitizeName(subOption.option));
                  await subOptionRef.set({
                    code: subOption.code,
                    name: subOption.option,
                  });
      
                  if (subOption.subOptions) {
                    for (const grandSubOption of subOption.subOptions) {
                      const grandSubOptionRef = await subOptionRef
                        .collection('subOptions')
                        .doc(sanitizeName(grandSubOption.option));
                      await grandSubOptionRef.set({
                        code: grandSubOption.code,
                        name: grandSubOption.option,
                      });
                    }
                  }
                }
              }
            }
          }
      
          console.log('Data stored in Firestore.');
        } catch (error) {
          console.error('Error storing data:', error);
        }
      };

    const sanitizeName = (string) => {
        const updateString = string.replace(/[^a-zA-Z0-9]/g, '_')
        return updateString
    }
    storeDataInFirestore(data)
}