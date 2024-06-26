import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
    entries: ['src/index', 'src/cli'],
    outDir: 'dist',
    declaration: true,
    clean: true,
    rollup: {
        emitCJS: true,
        inlineDependencies: true,
    },
})
