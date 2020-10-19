interface Options {
    [key: string]: string;
}

function makeSearch(options: Options = {}): string {
    const searchQuery = Object.keys(options)
        .filter((param) => !!options[param])
        .map((param) => `${param}=${encodeURIComponent(options[param])}`)
        .join('&');
    return searchQuery ? '?' + searchQuery : '';
}

export default { makeSearch };
