export const format = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Intl.DateTimeFormat('en-IN', options).format(new Date(dateString));
}

export const sortByCol = (data, column) => {
    let sorted = data;
    switch (column) {
        case 'name':
            sorted = data.sort((a, b) => {
                return a[column].toLowerCase().localeCompare(b[column].toLowerCase());
            });
            break;
        case 'dateLastEdited':
            sorted = data.sort((a, b) => {
                return (new Date(b.dateLastEdited)).getTime() - (new Date(a.dateLastEdited)).getTime();
            });
            break;
        default:
            break;
    }
    return sorted;
}

export const searchOn = (searchText, data) => {
    
    if (searchText.startsWith('"') && searchText.endsWith('"')) {
        const exactSearchTerm = searchText.substring(1, searchText.length - 1).toLowerCase();
        return data.filter(feed => feed.name.toLowerCase().includes(exactSearchTerm)
            || feed.description.toLowerCase().includes(exactSearchTerm));
    } else {
        let expStr = searchText.split(' ').reduce((acc, word) => {
            acc += `(?=.*\\b${word}\\b)`;
            return acc;
        }, '');

        const regex = new RegExp(expStr, 'i');
        return data.filter(feed => regex.test(feed.name) || regex.test(feed.description));
    }
    
}

export const parseQueryString = (query) => {
    const filters = query.substring(1).split('&');
    return filters.reduce((acc, filter) => {
        const [key, value] = filter.split('=');
        acc[key] = decodeURI(value);
        return acc;
    }, {});
}

/*
    example: [
        { key: 'sortBy', value: 'name'},
        {key: 'search', value: 'Hello']
    ]
 */
export const genQueryString = (filters) => {
    const first = filters.pop();
    let query = `?${first.key}=${encodeURI(first.value)}`;

    for(let i = 0; i < filters.length; i++) {
        const { key, value } = filters[i];
        query += `&${key}=${encodeURI(value)}`;
    }

    return query;
}