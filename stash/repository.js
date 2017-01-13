var url = require('url');

var SLASH_SLUG = '\\/([a-z0-9_\\-~.]+)'
var REGEXP_PROJECT_DATA = new RegExp('^\\/(projects|scm)' + SLASH_SLUG, 'i')
var REGEXP_REPO_DATA    = new RegExp(SLASH_SLUG + '(\\.git)?$', 'i')
var REGEXP_SSH_FORMAT   = new RegExp('^' + SLASH_SLUG + SLASH_SLUG + '\\.git$', 'i')

function getProjectData(_repositoryUrl) {
    var project = _repositoryUrl.match(REGEXP_PROJECT_DATA)
    if (project !== null) {
        return {
            path: '/projects/' + project[2],
            name: project[2]
        };
    }
}

function getRepositoryData(_repositoryUrl) {
    var repo = _repositoryUrl.match(REGEXP_REPO_DATA)
    if (repo !== null) {
        return {
            path: '/repos/' + repo[1],
            name: repo[1]
        };
    }
}

function parseRepositoryUrl(_repositoryUrl) {
    var repositoryUrl = url.parse(_repositoryUrl);
    var sshFormat = repositoryUrl.pathname.match(REGEXP_SSH_FORMAT)

    if (sshFormat === null) {
        repositoryUrl.project = getProjectData(repositoryUrl.pathname);
        repositoryUrl.repository = getRepositoryData(repositoryUrl.pathname);
    }
    else {
        repositoryUrl.project = getProjectData('/projects/' + sshFormat[1]);
        repositoryUrl.repository = getRepositoryData('/repos/' + sshFormat[2]);
    }

    return repositoryUrl;
}

exports.parseUrl = parseRepositoryUrl;
