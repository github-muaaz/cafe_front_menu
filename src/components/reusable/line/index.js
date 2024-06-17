const Line = ({width, bgColor, height}) => {

    return(
        <hr
            style={{
                width: width || '100%',
                height: height || '4px',
                borderRadius: '5px',
                backgroundColor: bgColor || '#283618',
            }}
        />
    )
}

export default Line;