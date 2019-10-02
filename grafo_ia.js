$(document).ready(function () {
    criar_grafo(9);
    criar_aresta(1, 2);
    criar_aresta(1, 3);
    criar_aresta(3, 5);
    criar_aresta(2, 4);
    criar_aresta(4, 6);
    dijkstra(1, 3);
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
            $('.linha-cima').append(`<div class="vertice" id="vertice-${i}"><span class="vertice-text">${i}</span></div>`)
        } else {
            grafo.push([0, i]);
            $('.linha-baixo').append(`<div class="vertice"><span class="vertice-text">${i}</span></div>`)
        }
        i++;
    }

    vertices = num_vertices;
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
            }
        }
    });

}

function dijkstra(a_origem, a_destino) {

    let atual = a_origem;
    let filhos = [];
    let caminho = [a_origem];
    let proibido = [];

    while (atual != a_destino) {
        filhos = verifica_filhos(atual, proibido);
        if (filhos.length > 0) {
            anterior = atual;
            atual = menor_custo(filhos);
            caminho.push(atual);
        } else {
            proibido.push(atual);
            atual = a_origem;
            caminho = [a_origem];
        }
        console.log(atual);
    }

    console.log(caminho);
}

function menor_custo(filhos) {
    let menor;
    let menor_peso = 99999;
    filhos.forEach(filho => {
        if (filho.peso < menor_peso) {
            menor = filho;
            menor_peso = filho.peso;
        }
    });

    return menor.destino;
}

function verifica_filhos(vertice, proibido) {
    let filhos = [];
    arestas.forEach(aresta => {
        if (aresta.origem == vertice) {
            if (proibido.indexOf(aresta.destino) == -1) {
                filhos.push(aresta);
            }
        }
    });

    return filhos;
}