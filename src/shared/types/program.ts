interface ProgramStep {
    id: number
    title: string
    description: string
    order: number
    icon: string
}

export interface IProgram {
    id: number
    created_at: string
    updated_at: string
    title: string
    description: string
    image: string | null
    slug: string
    is_active: boolean
    is_featured: boolean
    order: number
    short_description: string
    program_type: string
    icon: string | null
    main_image: string | null
    video_url: string | null
    video_thumbnail: string | null
    is_main_program: boolean
    content: string
    target_audience: string | null
    duration: string | null
    author_name: string | null
    author_title: string | null
    quote: string | null
    steps: ProgramStep[]
}
