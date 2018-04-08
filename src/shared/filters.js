export const dogFilter = (dogs, filterParams = {}) => {
    let filterDogsArray = [...dogs]

    if (filterParams.age) {
        filterDogsArray = filterDogsArray.filter(dog => (dog.age.id === filterParams.age))
    };

    if (filterParams.size) {
        filterDogsArray = filterDogsArray.filter(dog => (dog.size.id === filterParams.size))
    };

    if (filterParams.breed) {
        filterDogsArray = filterDogsArray.filter(dog => (dog.breed.id === filterParams.breed))
    };

    return filterDogsArray;
};

export const parkFilter = (parks, filterParams = {}) => {
    let filterParksArray = [...parks];

    if (filterParams.fencedPark || filterParams.unfencedPark) {
        return filterParksArray.filter(park => (
            park.name.toLowerCase().includes(filterParams.searchQuery.trim().toLowerCase()) &&
            (park.fenced === filterParams.fencedPark || !park.fenced === filterParams.unfencedPark)
        ));
    } else {
        return [];
    }
};

export const userFilter = (users, filterParams = {}) => {
    let filterUsersArray = [...users];

    if (filterParams.searchQuery) {
        filterUsersArray = filterUsersArray.filter(user => {
            return user.username.includes(filterParams.searchQuery.trim().toLowerCase())
        })
    };

    if (filterParams.selectedPark) {
        filterUsersArray = filterUsersArray.filter(user => {
            return user.parks.some(park => park.id === filterParams.selectedPark)
        })
    };

    return filterUsersArray;
};

