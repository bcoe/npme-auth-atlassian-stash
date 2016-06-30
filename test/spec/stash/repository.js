var repository = require('../../../stash/repository');

describe('Repository URL parser', function () {
    it('should parse SSH url from package.json', function () {
        var url = repository.parseUrl('ssh://git@stash.domain.com/foo/bar-name.git');

        expect(url).to.have.deep.property('project.name', 'foo');
        expect(url).to.have.deep.property('project.path', '/projects/foo');

        expect(url).to.have.deep.property('repository.name', 'bar-name');
        expect(url).to.have.deep.property('repository.path', '/repos/bar-name');
    });
    it('should parse HTTP url from package.json', function () {
        var url = repository.parseUrl('http://stash.domain.com/projects/foo/repos/bar.git');

        expect(url).to.have.deep.property('project.name', 'foo');
        expect(url).to.have.deep.property('project.path', '/projects/foo');

        expect(url).to.have.deep.property('repository.name', 'bar');
        expect(url).to.have.deep.property('repository.path', '/repos/bar');
    });
    it('should handle /scp/:project/:repo format URL', function () {
      var url = repository.parseUrl('http://stash.domain.com/scm/npme/ci-demo-stash.git');

      expect(url).to.have.deep.property('project.name', 'npme');
      expect(url).to.have.deep.property('project.path', '/projects/npme');

      expect(url).to.have.deep.property('repository.name', 'ci-demo-stash');
      expect(url).to.have.deep.property('repository.path', '/repos/ci-demo-stash');
    })
});
