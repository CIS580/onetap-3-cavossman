module.exports = exports = EntityManager;

function EntityManager(width, height, cellSize){
	this.worldWidth = width;
	this.worldHeight = height;
	this.cellSize = cellSize;
	this.widthInCells = Math.ceil(width / cellSize);
	this.numberOfCells = this.widthInCells * Math.ceil(height /cellSize);
	this.cells = [];
	for(var i = 0; i < this.numberOfCells; i++){
		this.cells[i] = [];
	}
}
EntityManager.prototype.addEntity = function(entity){
	var x = Math.floor(entity.x / this.cellSize);
	var y = Math.ceil((entity.x + entity.width)/this.cellSize);
	
	var index = y * this.widthInCells + x;
	this.cells[index].push(entity);
		entity._cell = index;
}

EntityManager.prototype.updateEntity = function(entity) {
	var x = Math.floor(entity.x / this.cellSize);
	var y = Math.ceil((entity.x + entity.width)/this.cellSize);
	var index = y * this.widthInCells + x;
	
	if(index != 0){
		var cellIndex = this.cells[entity._cell].indexOf(entity);
		if(cellIndex != -1) this.cells[entity._cell].splice(cellIndex, 1);
		this.cells
	}
}

EntityManager.prototype.removeEntity = function(entity){
	var cellIndex = this.cells[entity._cell]
}

EntityManager.prototype.collide = function(callback){
	var self = this;
	this.cells.forEach(function(cell, i){
		cell.forEach(function(entity1){
			cell.forEach(function(entity2){
				if(entity1 != entity2) checkForCollision(entity1, entity2, callback);
			}
			if(i % self.widthInCells != 0){
				self.cells[i+1].forEach(function(entity2){
					checkForCollision(entity1, entity2, callback);
				
				});
			}
			if(i < self.numberOfCells - self.widthInCells){
				self.cells[i + self.widthInCells].forEach(function(entity2){
					checkForCollision(entity1, entity2, callback);
				});
			}
			if( i < self.numberOfCells - self.widthInCells && i % (self.widthInCells - 1)){
				self.cells[i + self.widthInCells + 1].forEach(function(entity2){
					checkForCollision(entity1, entity2, callback);
				});
			} 
		}
	}
}

function checkForCollision(entity1, entity2, callback){
	var collides = !(entity1.x + entity1.width < entity2.x  ||
	                 entity1.x > entity2.x + entity2.width  ||
				     entity1.y + entity1.height < entity2.y ||
				     entity1.y > entity2.y + entity2.height);
	if(collides){
		callback(entity1, entity2);
	}
}