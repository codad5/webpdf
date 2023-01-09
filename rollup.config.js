export default [
    {
        input:'dist/content.js',
        watch: true,
        output:{
            file:'lib/js/content.js',
            format: 'iife'
        }
    }
];