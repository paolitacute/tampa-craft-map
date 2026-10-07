import { pool } from './database.js'

async function seedDatabase() {
  try {
    await pool.query(`
      DROP TABLE IF EXISTS events;
      DROP TABLE IF EXISTS locations;
    `)

    await pool.query(`
      CREATE TABLE locations (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        image VARCHAR(255),
        tags TEXT[],
        price INTEGER,
        address TEXT,
        latitude DECIMAL(9,6),
        longitude DECIMAL(10,6)
      );
    `)
    
    await pool.query(`
      CREATE TABLE events (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        date TIMESTAMP,
        description TEXT,
        location_id INTEGER REFERENCES locations(id) ON DELETE CASCADE
      );
    `)

    await pool.query(`
      INSERT INTO locations (title, description, image, tags, price, address, latitude, longitude) VALUES
      ('Birdettes', 'An eclectic craft and gathering space featuring painted bird murals, vintage furniture, and a central table stacked with magazines and art supplies.', './pics/birdettes.webp', ARRAY['craft', 'cafe'], 2, '2710 N Florida Ave, Tampa, FL 33602', 27.967403, -82.459590),
      ('Blooming Floral Cafe', 'A beautifully decorated cafe featuring a blue piano, ornate floral decor, and a mirror inscribed with the phrase "live life in full bloom".', './pics/blooming_floral_cafe.webp', ARRAY['cafe'], 2, '4408 N Florida Ave, Tampa, FL 33603', 27.985695, -82.459790),
      ('Bottom of the Bin', 'A dedicated storefront offering secondhand art and craft supplies, a local art showcase, and creative classes.', './pics/bottom_of_the_bin.webp', ARRAY['craft', 'thrifting'], 1, '9444 Seminole Blvd, Seminole, FL 33772', 27.870782, -82.790299),
      ('Elevenses', 'A cozy bakery and coffee shop operating out of a charming two-story white building with a colorful pastel sign.', './pics/elevenses.webp', ARRAY['cafe', 'desserts'], 2, '1001 E Columbus Dr, Tampa, FL 33605', 27.966964, -82.448891),
      ('Felicitous (on 51st)', 'A relaxed coffee and tea house featuring purple walls, eclectic vintage furniture, and a laid-back atmosphere.', './pics/felicitous.webp', ARRAY['cafe'], 1, '11706 N 51st St, Tampa, FL 33617', 28.055277, -82.400209),
      ('Rey Liquidation', 'A retail liquidation store packed with industrial shelving holding home goods, small kitchen appliances, and toys.', './pics/rey_liquidation.webp', ARRAY['thrifting'], 1, '6912 Harney Rd, Tampa, FL 33617', 28.011294, -82.376880),
      ('Scraporium', 'A specialized craft supply store heavily stocked with a wide variety of colorful scrapbooking paper and crafting tools.', './pics/scraporium.png', ARRAY['craft', 'thrifting'], 2, '16518 N Florida Ave, Lutz, FL 33549', 28.106420, -82.460656),
      ('Sew Pinellas', 'A bright pink sewing studio equipped with multiple sewing machines set up on large work tables for classes or open workshops.', './pics/sew_pinellas.webp', ARRAY['craft'], 2, '5601 Haines Rd N Front Building, St. Petersburg, FL 33714', 27.823203, -82.670301),
      ('The Milkshake Bar', 'A dessert destination serving extravagant, over-the-top milkshakes loaded with toppings like miniature cookies and whipped cream.', './pics/the_milkshake_bar.webp', ARRAY['desserts'], 3, '13168 N Dale Mabry Hwy Unit 30, Tampa, FL 33618', 28.077019, -82.509983),
      ('You Do The Dishes', 'A vibrant paint-your-own-pottery studio featuring extensive wooden shelves stocked with unpainted ceramic mugs, bowls, and figures.', './pics/you_do_the_dishes.webp', ARRAY['craft', 'cafe'], 2, '15357 Amberly Dr, Tampa, FL 33647', 28.087805, -82.403803),
      ('Ice Screamin', 'An ice cream destination serving loaded waffle cone desserts topped with whipped cream, cookie crumbles, and caramel drizzle against a vibrant pop-art background.', './pics/ice_screamin.webp', ARRAY['desserts'], 2, '14933 Bruce B Downs Blvd, Tampa, FL 33613', 28.083379, -82.411840);
    `)
    
    await pool.query(`
      INSERT INTO events (title, date, description, location_id) VALUES
      ('Magazine Collage Night', '2026-10-15 18:00:00', 'Bring your own scissors, we provide the magazines and glue.', 1),
      ('Beginner Sewing Workshop', '2026-10-20 17:00:00', 'Learn the basics of threading and straight stitching.', 8),
      ('Pottery Painting Social', '2026-10-10 19:00:00', 'Paint a mug while enjoying coffee and pastries.', 10),
      ('Scrapbooking Saturday', '2026-10-25 10:00:00', 'Morning scrapbooking with new paper collections.', 7);
    `)
    console.log('Seeding completed successfully.')
  } catch (err) {
    console.error('Error seeding database:', err)
  } finally {
    await pool.end()
  }
}

seedDatabase()