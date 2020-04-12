const fetch = require('node-fetch')
const data = [{
    "email": "Josef_mentzen@logokett.com",
    "companyName": "Logokett GmbH",
    "firstName": "Josef",
    "lastName": "Mentzen",
    "country": "Germany",
    "city": "Ratingen",
    "zip": "40885",
    "street": "An der Horst 32",
    "vatNumber": "",
    "productType": "Mask",
    "title": "Surgical mask",
    "description": "",
    "minPrice": 60,
    "maxPrice": 60,
    "unit": "",
    "capacity": 150000,
    "leadTime": 10,
    "minOrderAmount": 0
  },
  {
    "email": "Josef_mentzen@logokett.com",
    "companyName": "Logokett GmbH",
    "firstName": "Josef",
    "lastName": "Mentzen",
    "country": "Germany",
    "city": "Ratingen",
    "zip": "40885",
    "street": "An der Horst 32",
    "vatNumber": "",
    "productType": "Mask",
    "title": "KN 95",
    "description": "",
    "minPrice": 270,
    "maxPrice": 270,
    "unit": "",
    "capacity": 150000,
    "leadTime": 10,
    "minOrderAmount": 0
  },
  {
    "email": "gaucinicolai@gmail.com",
    "companyName": "Gauci",
    "firstName": "Nicolai",
    "lastName": "Gauci",
    "country": "",
    "city": "",
    "zip": "",
    "street": "",
    "vatNumber": "",
    "productType": "Mask",
    "title": "KN95",
    "description": "",
    "minPrice": 3,
    "maxPrice": 3,
    "unit": "",
    "capacity": 2500000,
    "leadTime": 6,
    "minOrderAmount": 0
  },
  {
    "email": "info@corona-shop24.com",
    "companyName": "Finalia GmbH i. G  / Lieferant Schwarz-Haß-Jackisch GbR",
    "firstName": "Marian",
    "lastName": "Wiele",
    "country": "Germany",
    "city": "Beratzhausen",
    "zip": "93176",
    "street": "Industriestraße 6",
    "vatNumber": "DE306818495",
    "productType": "Mask",
    "title": "Surgical mask",
    "description": "",
    "minPrice": 0,
    "maxPrice": 0,
    "unit": "",
    "capacity": 0,
    "leadTime": 15,
    "minOrderAmount": 0
  },
  {
    "email": "info@corona-shop24.com",
    "companyName": "Finalia GmbH i. G  / Lieferant Schwarz-Haß-Jackisch GbR",
    "firstName": "Marian",
    "lastName": "Wiele",
    "country": "Germany",
    "city": "Beratzhausen",
    "zip": "93176",
    "street": "Industriestraße 6",
    "vatNumber": "DE306818495",
    "productType": "Mask",
    "title": "KN95",
    "description": "",
    "minPrice": 0,
    "maxPrice": 0,
    "unit": "",
    "capacity": 0,
    "leadTime": 15,
    "minOrderAmount": 0
  },
  {
    "email": "info@corona-shop24.com",
    "companyName": "Finalia GmbH i. G  / Lieferant Schwarz-Haß-Jackisch GbR",
    "firstName": "Marian",
    "lastName": "Wiele",
    "country": "Germany",
    "city": "Beratzhausen",
    "zip": "93176",
    "street": "Industriestraße 6",
    "vatNumber": "DE306818495",
    "productType": "Mask",
    "title": "FFP2",
    "description": "",
    "minPrice": 0,
    "maxPrice": 0,
    "unit": "",
    "capacity": 0,
    "leadTime": 15,
    "minOrderAmount": 0
  },
  {
    "email": "info@corona-shop24.com",
    "companyName": "Finalia GmbH i. G  / Lieferant Schwarz-Haß-Jackisch GbR",
    "firstName": "Marian",
    "lastName": "Wiele",
    "country": "Germany",
    "city": "Beratzhausen",
    "zip": "93176",
    "street": "Industriestraße 6",
    "vatNumber": "DE306818495",
    "productType": "Clothing",
    "title": "Gown",
    "description": "",
    "minPrice": 0,
    "maxPrice": 0,
    "unit": "",
    "capacity": 0,
    "leadTime": 15,
    "minOrderAmount": 0
  },
  {
    "email": "busch@buschundchen.de",
    "companyName": "Busch&Chen GbR",
    "firstName": "Martin",
    "lastName": "Busch",
    "country": "Germany",
    "city": "Düsseldorf",
    "zip": "40219",
    "street": "Siegstrasse 17",
    "vatNumber": "",
    "productType": "Mask",
    "title": "KN95",
    "description": "",
    "minPrice": 270,
    "maxPrice": 270,
    "unit": "",
    "capacity": 2000000,
    "leadTime": 7,
    "minOrderAmount": 10000
  },
  {
    "email": "arashmakhsouspour@gmail.com",
    "companyName": "AMP",
    "firstName": "Arash",
    "lastName": "Makhsouspour",
    "country": "Germany",
    "city": "Aachen",
    "zip": "52074",
    "street": "Lennestrasse 3",
    "vatNumber": "DE308232597",
    "productType": "Mask",
    "title": "Surgical mask",
    "description": "",
    "minPrice": 0,
    "maxPrice": 0,
    "unit": "",
    "capacity": 100000,
    "leadTime": 12,
    "minOrderAmount": 15000
  },
  {
    "email": "arashmakhsouspour@gmail.com",
    "companyName": "AMP",
    "firstName": "Arash",
    "lastName": "Makhsouspour",
    "country": "Germany",
    "city": "Aachen",
    "zip": "52074",
    "street": "Lennestrasse 3",
    "vatNumber": "DE308232597",
    "productType": "Mask",
    "title": "KN95",
    "description": "",
    "minPrice": 0,
    "maxPrice": 0,
    "unit": "",
    "capacity": 100000,
    "leadTime": 12,
    "minOrderAmount": 10000
  },
  {
    "email": "yvonne.schweipert@novotech.de",
    "companyName": "Novotech GmbH",
    "firstName": "Yvonne",
    "lastName": "Schweipert",
    "country": "Germany",
    "city": "Meschede-Freienohl",
    "zip": "59872",
    "street": "Wildshausener Straße 77",
    "vatNumber": "",
    "productType": "Mask",
    "title": "Surgical mask",
    "description": "",
    "minPrice": 0,
    "maxPrice": 0,
    "unit": "",
    "capacity": 0,
    "leadTime": 0,
    "minOrderAmount": 0
  },
  {
    "email": "yvonne.schweipert@novotech.de",
    "companyName": "Novotech GmbH",
    "firstName": "Yvonne",
    "lastName": "Schweipert",
    "country": "Germany",
    "city": "Meschede-Freienohl",
    "zip": "59872",
    "street": "Wildshausener Straße 77",
    "vatNumber": "",
    "productType": "Mask",
    "title": "FFP2",
    "description": "",
    "minPrice": 0,
    "maxPrice": 0,
    "unit": "",
    "capacity": 0,
    "leadTime": 0,
    "minOrderAmount": 0
  },
  {
    "email": "yvonne.schweipert@novotech.de",
    "companyName": "Novotech GmbH",
    "firstName": "Yvonne",
    "lastName": "Schweipert",
    "country": "Germany",
    "city": "Meschede-Freienohl",
    "zip": "59872",
    "street": "Wildshausener Straße 77",
    "vatNumber": "",
    "productType": "Clothing",
    "title": "Gown",
    "description": "",
    "minPrice": 0,
    "maxPrice": 0,
    "unit": "",
    "capacity": 0,
    "leadTime": 0,
    "minOrderAmount": 0
  },
  {
    "email": "yvonne.schweipert@novotech.de",
    "companyName": "Novotech GmbH",
    "firstName": "Yvonne",
    "lastName": "Schweipert",
    "country": "Germany",
    "city": "Meschede-Freienohl",
    "zip": "59872",
    "street": "Wildshausener Straße 77",
    "vatNumber": "",
    "productType": "Headgear",
    "title": "Glasses",
    "description": "",
    "minPrice": 0,
    "maxPrice": 0,
    "unit": "",
    "capacity": 0,
    "leadTime": 0,
    "minOrderAmount": 0
  },
  {
    "email": "holger.rupp@h3r.eu",
    "companyName": "H3R Consulting GmbH",
    "firstName": "Holger",
    "lastName": "Rupp",
    "country": "Germany",
    "city": "Reutlingen",
    "zip": "72764",
    "street": "Burgstr. 73",
    "vatNumber": "DE232505591",
    "productType": "Mask",
    "title": "Surgical mask",
    "description": "",
    "minPrice": 59,
    "maxPrice": 79,
    "unit": "",
    "capacity": 1000000,
    "leadTime": 21,
    "minOrderAmount": 100000
  },
  {
    "email": "holger.rupp@h3r.eu",
    "companyName": "H3R Consulting GmbH",
    "firstName": "Holger",
    "lastName": "Rupp",
    "country": "Germany",
    "city": "Reutlingen",
    "zip": "72764",
    "street": "Burgstr. 73",
    "vatNumber": "DE232505591",
    "productType": "Mask",
    "title": "FFP2",
    "description": "",
    "minPrice": 480,
    "maxPrice": 480,
    "unit": "",
    "capacity": 1000000,
    "leadTime": 21,
    "minOrderAmount": 10000
  },
  {
    "email": "nils.fitzner@fitzner.de",
    "companyName": "Fitzner GmbH & Co. KG",
    "firstName": "Nils",
    "lastName": "Fitzner",
    "country": "Germany",
    "city": "Pr. Oldendorf",
    "zip": "32361",
    "street": "Schillerstr. 53",
    "vatNumber": "",
    "productType": "Mask",
    "title": "Surgical mask",
    "description": "",
    "minPrice": 0,
    "maxPrice": 0,
    "unit": "",
    "capacity": 0,
    "leadTime": 0,
    "minOrderAmount": 0
  },
  {
    "email": "nils.fitzner@fitzner.de",
    "companyName": "Fitzner GmbH & Co. KG",
    "firstName": "Nils",
    "lastName": "Fitzner",
    "country": "Germany",
    "city": "Pr. Oldendorf",
    "zip": "32361",
    "street": "Schillerstr. 53",
    "vatNumber": "",
    "productType": "Mask",
    "title": "FFP2",
    "description": "",
    "minPrice": 0,
    "maxPrice": 0,
    "unit": "",
    "capacity": 0,
    "leadTime": 0,
    "minOrderAmount": 0
  },
  {
    "email": "nils.fitzner@fitzner.de",
    "companyName": "Fitzner GmbH & Co. KG",
    "firstName": "Nils",
    "lastName": "Fitzner",
    "country": "Germany",
    "city": "Pr. Oldendorf",
    "zip": "32361",
    "street": "Schillerstr. 53",
    "vatNumber": "",
    "productType": "Clothing",
    "title": "Gown",
    "description": "",
    "minPrice": 0,
    "maxPrice": 0,
    "unit": "",
    "capacity": 0,
    "leadTime": 0,
    "minOrderAmount": 0
  },
  {
    "email": "nils.fitzner@fitzner.de",
    "companyName": "Fitzner GmbH & Co. KG",
    "firstName": "Nils",
    "lastName": "Fitzner",
    "country": "Germany",
    "city": "Pr. Oldendorf",
    "zip": "32361",
    "street": "Schillerstr. 53",
    "vatNumber": "",
    "productType": "Headgear",
    "title": "Glasses",
    "description": "",
    "minPrice": 0,
    "maxPrice": 0,
    "unit": "",
    "capacity": 0,
    "leadTime": 0,
    "minOrderAmount": 0
  }
]


async function graphQuery(
  query,
  variables
) {
  try {
    const res = await fetch(
      "http://167.172.96.230/v1/graphql", {
        method: "POST",
        body: JSON.stringify({
          query,
          variables
        }),
        headers: {
          "Content-Type": "application/json",
          "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET
        }
      }
    );
    return await res.json();
  } catch (e) {
    throw new Error(e.message);
  }
}

const objToGraphQLInput = obj => JSON.stringify(obj).replace(/"([^"]+)":/g, '$1:');

(async () => {
  const hasuraProductTypes = await graphQuery(`
    query {
      productTypes {
        id
        title
      }
    }
  `)
  const {
    productTypes
  } = hasuraProductTypes.data
  for (const row of data) {
    const {
      productType
    } = row
    const match = productTypes.find(_productType => _productType.title === productType)
    if (match === undefined) {
      // Create producttype
      const result = await graphQuery(`
        mutation {
          insert_productTypes(objects: {title: "${productType}"}) {
            returning {
              id
            }
          }
        }
      `)
      debugger
      productTypes.push({
        id: result.data.insert_productTypes.returning[0].id,
        title: productType
      })
    }
  }


  const hasuraSuppliers = await graphQuery(`
    query {
      suppliers {
        id
        email
      }
    }
  `)
  const {
    suppliers
  } = hasuraSuppliers.data
  for (const row of data) {
    const {
      email
    } = row
    const match = suppliers.find(supplier => supplier.email === email)
    if (match === undefined) {
      // Create producttype
      const input = {
        email: row.email,
        companyName: row.companyName,
        firstName: row.firstName,
        lastName: row.lastName,
        country: row.country,
        city: row.city,
        zip: row.zip,
        street: row.street,
        vatNumber: row.vatNumber,
      }
      const result = await graphQuery(`
        mutation {
          insert_suppliers(objects: ${objToGraphQLInput(input)}) {
            returning {
              id
            }
          }
        }
      `)
      suppliers.push({
        id: result.data.insert_suppliers.returning[0].id,
        email
      })
    }
  }

  const hasuraProducts = await graphQuery(`
  query {
    products {
      id
      supplierId
      typeId
      title
      description
      minPrice
      maxPrice
      unit
      capacity
      leadTime
      minOrderAmount
    }
  }
  `)
  const {
    products
  } = hasuraProducts.data
  for (const row of data) {
    const {
      email,
      productType,
      title,
      description,
      minPrice,
      maxPrice,
      unit,
      capacity,
      leadTime,
      minOrderAmount
    } = row
    const supplierId = suppliers.find(supplier => supplier.email === email).id
    const typeId = productTypes.find(_productType => _productType.title === productType).id
    const match = products.find(product =>
      product.supplierId === supplierId &&
      product.typeId === typeId &&
      product.title === title &&
      product.description === description &&
      product.minPrice === minPrice &&
      product.maxPrice === maxPrice &&
      product.unit === unit &&
      product.capacity === capacity &&
      product.leadTime === leadTime &&
      product.minOrderAmount === minOrderAmount
    )
    if (match) continue
    const input = {
      typeId,
      supplierId,
      title,
      description,
      minPrice,
      maxPrice,
      unit,
      capacity,
      leadTime,
      minOrderAmount,
    }
    const result = await graphQuery(`
      mutation {
        insert_products(objects: ${objToGraphQLInput(input)}) {
          returning {
            id
          }
        }
      }
    `)
    debugger
  }

})()
