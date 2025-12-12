-- Insert sample games
INSERT INTO games (title, description, genre, platform, image_url) VALUES
('Cyberpunk 2077', 'Open-world action-adventure story set in Night City', 'RPG', 'PC, PS5, Xbox', '/placeholder.svg?height=300&width=400'),
('The Witcher 3: Wild Hunt', 'Story-driven open world RPG set in a visually stunning fantasy universe', 'RPG', 'PC, PS4, Xbox, Switch', '/placeholder.svg?height=300&width=400'),
('Red Dead Redemption 2', 'Epic tale of life in Americas unforgiving heartland', 'Action', 'PC, PS4, Xbox', '/placeholder.svg?height=300&width=400'),
('Elden Ring', 'Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring', 'RPG', 'PC, PS5, Xbox', '/placeholder.svg?height=300&width=400'),
('God of War', 'His vengeance against the Gods of Olympus years behind him, Kratos now lives as a man', 'Action', 'PC, PS4, PS5', '/placeholder.svg?height=300&width=400');

-- Insert sample deals
INSERT INTO deals (game_id, store_name, original_price, sale_price, discount_percentage, deal_url, expires_at) VALUES
(1, 'Steam', 59.99, 29.99, 50, 'https://store.steampowered.com/app/1091500', NOW() + INTERVAL '7 days'),
(1, 'Epic Games', 59.99, 19.99, 67, 'https://store.epicgames.com/cyberpunk', NOW() + INTERVAL '5 days'),
(2, 'GOG', 39.99, 9.99, 75, 'https://gog.com/witcher3', NOW() + INTERVAL '10 days'),
(2, 'Steam', 39.99, 15.99, 60, 'https://store.steampowered.com/app/292030', NOW() + INTERVAL '3 days'),
(3, 'Rockstar Games', 59.99, 39.99, 33, 'https://rockstargames.com/reddeadredemption2', NOW() + INTERVAL '14 days'),
(4, 'Steam', 59.99, 47.99, 20, 'https://store.steampowered.com/app/1245620', NOW() + INTERVAL '2 days'),
(5, 'PlayStation Store', 49.99, 24.99, 50, 'https://store.playstation.com/god-of-war', NOW() + INTERVAL '6 days');
