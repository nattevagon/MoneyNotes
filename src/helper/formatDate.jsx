export const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric"
    }).format(new Date(date));
};