$(document).ready(function () {
    criar_grafo(9);
    criar_aresta(1, 2);
    criar_aresta(3, 7);
    criar_aresta(1, 4);
});

var grafo = [];
var arestas = [];
var vertices = 2;
var matriz_arestas = [];

function criar_grafo(num_vertices) {
    $('.linha-cima').html('');
    $('.linha-baixo').html('')
    let i = 1;
    while (i <= num_vertices) {
        if (i % 2 != 0) {
            grafo.push([2, i]);
            $('.linha-cima').append(`<div class="vertice" id=vertice-${i}><span class="vertice-text">${i}</span></div>`)
        } else {
            grafo.push([0, i]);
            $('.linha-baixo').append(`<div class="vertice"><span class="vertice-text">${i}</span></div>`)
        }
        i++;
    }

    vertices = num_vertices;

    console.log(grafo);
}

function criar_aresta(a_origem, a_destino) {
    let opcoes = [];
    let i = 1;
    while (i <= vertices) {
        if (i != 1) {
            if (i != 2) {
                if (i != vertices - 1) {
                    if (i != vertices) {
                        if (i % 2 != 0) {
                            opcoes.push({
                                vertice: i,
                                opcoes: [i - 2, i - 1, i + 1, i + 2, i + 3]
                            });
                        } else {
                            opcoes.push({
                                vertice: i,
                                opcoes: [i - 3, i - 2, i - 1, i + 1, i + 2]
                            });
                        }

                    } else {
                        opcoes.push({
                            vertice: i,
                            opcoes: [i - 2, i - 1]
                        });
                    }
                } else {
                    if (i % 2 != 0) {
                        opcoes.push({
                            vertice: i,
                            opcoes: [i - 2, i - 1, i + 1]
                        });
                    } else {
                        opcoes.push({
                            vertice: i,
                            opcoes: [i - 3, i - 2, i - 1, i + 1]
                        });
                    }

                }

            } else {
                opcoes.push({
                    vertice: i,
                    opcoes: [i - 1, i + 1, i + 2]
                });
            }
        } else {
            opcoes.push({
                vertice: i,
                opcoes: [i + 1, i + 2, i + 3]
            });
        }
        i++;
    }

    opcoes.forEach(vertice => {
        if (vertice.vertice == a_origem) {
            if (vertice.opcoes.indexOf(a_destino) > -1) {
                console.log('valido ' + a_origem + '-' + a_destino);
                console.log(vertice.opcoes);
                if (a_origem % 2 != 0) {
                    if (a_destino == a_origem + 3 || a_destino == a_origem - 1) {
                        console.log('diagonal');
                        arestas.push({
                            origem: a_origem,
                            destino: a_destino,
                            peso: 1.41
                        });
                    } else {
                        console.log('horizontal/vertical');
                        arestas.push({
                            origem: a_origem,
                            destino: a_destino,
                            peso: 1
                        });
                    }
                } else {
                    if (a_destino == a_origem - 3 || a_destino == a_origem + 1) {
                        console.log('diagonal');
                        arestas.push({
                            origem: a_origem,
                            destino: a_destino,
                            peso: 1.41
                        });
                    } else {
                        console.log('horizontal/vertical');
                        arestas.push({
                            origem: a_origem,
                            destino: a_destino,
                            peso: 1
                        });
                    }
                }

                matriz_arestas.push([a_origem, a_destino]);
            } else {
                console.log('invalido ' + a_origem + '-' + a_destino);
                console.log(vertice.opcoes);
            }
        }
    });

}