// base 경로(GitHub Pages의 /regula/ 등)를 붙인 내부 링크
export const href = (path = '') => `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
