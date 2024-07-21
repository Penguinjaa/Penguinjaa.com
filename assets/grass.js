        // Array containing image names for different seasons
        const winterImages = ['assets/grass/Grass10.png'];
        const springImages = ['assets/grass/Grass1.png', 'assets/grass/Grass2.png'];
        const summerImages = ['assets/grass/Grass3.png', 'assets/grass/Grass4.png'];
        const fallImages = ['assets/grass/Grass6.png', 'assets/grass/Grass7.png', 'assets/grass/Grass8.png', 'assets/grass/Grass9.png'];

        // Function to set the background image based on the current date
        function setBackgroundByDate() {
            const currentDate = new Date();
            const month = currentDate.getMonth() + 1; // Months are 0-indexed, adding 1 to get current month

            let images;

            // Determine the current season based on the month
            if (month >= 1 && month <= 2 || month === 12) { // Winter: December, January, February
            images = winterImages;
            } else if (month >= 3 && month <= 5) { // Spring: March, April, May
            images = springImages;
            } else if (month >= 6 && month <= 8) { // Summer: June, July, August
            images = summerImages;
            } else { // Fall: September, October, November
            images = fallImages;
            }

            // Calculate the index in the season array based on the current date
            const dayOfMonth = currentDate.getDate();
            const index = dayOfMonth % images.length;

            // Set the background image based on the calculated index
            document.getElementById('seasonbox').style.backgroundImage = `url('${images[index]}')`;
        }

        // Call the function to set background based on the current date
        setBackgroundByDate();

        // Function to set the background image based on a specific date (for testing)
        function setTestDate(day, month) {
            const testDate = new Date(new Date().getFullYear(), month - 1, day); // Month is 0-indexed
            const dayOfMonth = testDate.getDate();
            let images;

            if (month >= 1 && month <= 2 || month === 12) { // Winter: December, January, February
            images = winterImages;
            } else if (month >= 3 && month <= 5) { // Spring: March, April, May
            images = springImages;
            } else if (month >= 6 && month <= 8) { // Summer: June, July, August
            images = summerImages;
            } else { // Fall: September, October, November
            images = fallImages;
            }

            const index = dayOfMonth % images.length;
            document.body.style.backgroundImage = `url('${images[index]}')`;
        }

        // Call the function to set background based on a specific date for testing purposes
        // setTestDate(1, 9);