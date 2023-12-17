const blocks = {
    straight : [
        [[0,0],[0,1],[0,2],[0,3]],
        [[0,1],[1,1],[2,1],[3,1]],
        [[0,0],[0,1],[0,2],[0,3]],
        [[0,1],[1,1],[2,1],[3,1]],
    ],
    square :[
        [[0,0],[0,1],[1,0],[1,1]],
        [[0,0],[0,1],[1,0],[1,1]],
        [[0,0],[0,1],[1,0],[1,1]],
        [[0,0],[0,1],[1,0],[1,1]],
    ],
    layLeft:[
        [[0,0],[0,1],[1,1],[2,1]],
        [[1,0],[1,1],[1,2],[0,2]],
        [[0,1],[1,1],[2,1],[2,2]],
        [[1,0],[2,0],[1,1],[1,2]],
    ],
    layRight : [
        [[1,0],[2,0],[1,1],[1,2]],
        [[0,0],[0,1],[1,1],[2,1]],
        [[0,2],[1,0],[1,1],[1,2]],
        [[0,1],[1,1],[2,1],[2,2]],
    ],
    lighting : [
        [[0,1],[1,1],[1,0],[0,2]],
        [[0,0],[1,0],[1,1],[2,1]],
        [[0,1],[1,1],[1,0],[0,2]],
        [[0,0],[1,0],[1,1],[2,1]],
    ],
    Rstair :[
        [[0,1],[1,1],[1,0],[2,0]],
        [[0,0],[0,1],[1,1],[1,2]],
        [[0,1],[1,1],[1,0],[2,0]],
        [[0,0],[1,1],[0,1],[1,2]],
    ],
    mountain : [
        [[1,0],[0,1],[1,1],[2,1]],
        [[1,0],[1,1],[2,1],[1,2]],
        [[0,1],[1,1],[1,2],[2,1]],
        [[0,1],[1,1],[1,0],[1,2]],
    ] 
}

export default blocks;