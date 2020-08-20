export function setup(canvas) {
  canvas.open = [canvas.startBlock];
  canvas.closed = [];
  canvas.path = [];

  for (let i = 0; i < canvas.r; i++) {
    for (let j = 0; j < canvas.c; j++) {
      canvas.calculateHa(canvas.blocks[i][j])
      canvas.blocks[i][j].ga = 1;
      canvas.blocks[i][j].fa = 0;
      canvas.blocks[i][j].visited = false;
      canvas.blocks[i][j].previous = undefined;
    }
  }
}

export function algo(canvas) {
  if (canvas.open.length > 0) {
    canvas.sortBlocks();

    let current = canvas.open[0];

    if (current == canvas.endBlock) {
      if (canvas.path.length == 0)
        canvas.path.pushBlock(current);

      let temp = canvas.path[0];

      if (temp.previous) {
        canvas.path.unshiftBlock(temp.previous);
        return true
      } else {
        canvas.updateAlgo = true;
        return false
      }
    }

    canvas.open.shiftBlock();
    canvas.closed.pushBlock(current);

    for (let i = 0; i < current.neighbors.length; i++) {
      let neighbor = current.neighbors[i];
      if (!canvas.closed.includes(neighbor) && !neighbor.wall) {
        if (!canvas.open.includes(neighbor)) {
          canvas.open.pushBlock(neighbor);
        }
        neighbor.fa = neighbor.ha;
        neighbor.previous = current;
      }
    }

    return true
  } else {
    // no solution
    canvas.successfulAlgo = false;
    canvas.updateAlgo = true;
    return false;
  }
}