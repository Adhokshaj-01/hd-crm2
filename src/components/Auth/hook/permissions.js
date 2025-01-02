export function extractPermissions(decodedToken) {
    if (!decodedToken) {
        return null; // Early return if the token is null
    }

    try {
        let permissions;

        // Check if permission is a valid JSON string and parse it
        if (typeof decodedToken.permission === 'string') {
            permissions = JSON.parse(decodedToken.permission);
        } else {
            permissions = decodedToken.permission;
        }

        return permissions || null;

    } catch (error) {
        console.error('Error parsing permission:', error);
        return null;
    }
}
